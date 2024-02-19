import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Contract } from '../contract.model';
import { MatTable } from '@angular/material/table';
import { ContractRead2DataSource } from './contract-read2-datasource';

@Component({
  selector: 'app-contract-read2',
  templateUrl: './contract-read2.component.html',
  styleUrls: ['./contract-read2.component.css']
})
export class ContractRead2Component implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Contract>;
  dataSource: ContractRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','employeeId', 'typeContract', 'salaryAmountMonth', 'salaryAmountYear', 'hoursAmountMonth', 'salaryDate', 'startDateContract', 'endDateContract']

  constructor() {
    this.dataSource = new ContractRead2DataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
