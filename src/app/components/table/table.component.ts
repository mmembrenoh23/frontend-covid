import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() dataSource: any[] = [];

  displayedColumns: string[] = [
    'country',
    'population',
    'cases',
    'time',
    'continent',
  ];

  groupByColumns: string[] = ['continent'];
  constructor() {

  }

  ngOnInit(): void {}

  isGroup(index, item): boolean {
    return item.level;
  }
}
