import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource  } from "@angular/material/table";
import { CovidService  } from "../services/covid.service";

export interface CovidSource {
  code: string;
  country: string;
  population: number;
  cases: number;
  time: string;
  continent:string;
}

export class GroupBy {
  level: number = 0;
  parent: GroupBy;
  expanded: boolean = true;
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<CovidSource | GroupBy>([]);
  loading: boolean;
  groupByColumns: string[] = ['continent'];

  error: boolean;
  messageError: string;

  constructor(protected covid: CovidService) {

    this.showCovidData();
  }
  ngOnInit(): void {}

  showCovidData(term: string = '') {
    var covid_;
    this.loading = true;
    if (term != '') {
      covid_ = this.covid.getDataCovidByCountry(term);
    } else {
      covid_ = this.covid.getDataCovid();
    }

    covid_.subscribe(
      (data: any) => {
        var covid_data = [];
        for (var item in data) {
          covid_data.push(data[item]);
        }
        this.loading = false;
        this.error = false  ;
        this.dataSource.data = this.addGroups(covid_data, this.groupByColumns);
        this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
      },
      (errorServicio) => {
        this.loading = true;
        this.error = true;
        this.messageError = errorServicio.error.message;
      }
    );
  }



  customFilterPredicate(data: CovidSource | GroupBy, filter: string): boolean {
    return data instanceof GroupBy
      ? data.visible
      : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: CovidSource): boolean {
    const groupRows = this.dataSource.data.filter((row) => {
      if (!(row instanceof GroupBy)) return false;

      let match = true;
      this.groupByColumns.forEach((column) => {
        if (!row[column] || !data[column] || row[column] !== data[column])
          match = false;
      });
      return match;
    });

    if (groupRows.length === 0) return true;
    if (groupRows.length > 1) throw 'Data row is in more than one group!';
    const parent = <GroupBy>groupRows[0]; // </Group> (Fix syntax coloring)

    return parent.visible && parent.expanded;
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    var rootGroup = new GroupBy();
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(
    data: any[],
    level: number,
    groupByColumns: string[],
    parent: GroupBy
  ): any[] {
    // Recursive function, stop when there are no more levels.
    if (level >= groupByColumns.length) return data;

    var groups = this.uniqueBy(
      data.map((row) => {
        var result = new GroupBy();
        result.level = level + 1;
        result.parent = parent;
        for (var i = 0; i <= level; i++)
          result[groupByColumns[i]] = row[groupByColumns[i]];
        return result;
      }),
      JSON.stringify
    );

    const currentColumn = groupByColumns[level];

    var subGroups = [];
    groups.forEach((group) => {
      let rowsInGroup = data.filter(
        (row) => group[currentColumn] === row[currentColumn]
      );
      let subGroup = this.getSublevel(
        rowsInGroup,
        level + 1,
        groupByColumns,
        group
      );
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  uniqueBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }
}
