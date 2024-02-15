import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EmployeeRead2DataSource } from './employee-read2-datasource';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-read2',
  templateUrl: './employee-read2.component.html',
  styleUrls: ['./employee-read2.component.css']
})
export class EmployeeRead2Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Employee>;
  dataSource: EmployeeRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'surname', 'salary', 'gender', 'address', 'email', 'phonenumber', 'nationality', 'dateOfBirth', 'action']

  constructor() {
    this.dataSource = new EmployeeRead2DataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
