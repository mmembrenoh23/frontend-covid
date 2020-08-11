import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface CovidSource {
  code: string;
  country: string;
  population: number;
  cases: number;
  time: string;
  continent: string;
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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() dataSource = new MatTableDataSource<CovidSource | GroupBy>([]);

  displayedColumns: string[] = [
    'country',
    'population',
    'cases',
    'time',
    'continent',
    'actions',
  ];
  groupByColumns: string[] = ['continent'];
  constructor() {
  }

  ngOnInit(): void {}

  isGroup(index, item): boolean {
    return item.level;
  }
  groupHeaderClick(row) {
    row.expanded = !row.expanded;
    this.dataSource.filter = performance.now().toString(); // hack to trigger filter refresh
  }
}
