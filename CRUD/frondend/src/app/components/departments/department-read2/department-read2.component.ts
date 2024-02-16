import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Department } from '../department.model';
import { DepartmentRead2DataSource } from './derpartment-read2-datasource';

@Component({
  selector: 'app-department-read2',
  templateUrl: './department-read2.component.html',
  styleUrls: ['./department-read2.component.css']
})
export class DepartmentRead2Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Department>;
  dataSource: DepartmentRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'departmentName', 'description']

  constructor() {
    this.dataSource = new DepartmentRead2DataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
}
