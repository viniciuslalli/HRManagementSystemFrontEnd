import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RoleRead2DataSource } from './roles-read2-datasource';
import { Role } from '../roles.model';

@Component({
  selector: 'app-roles-read2',
  templateUrl: './roles-read2.component.html',
  styleUrls: ['./roles-read2.component.css']
})
export class RolesRead2Component implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Role>;
  dataSource: RoleRead2DataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'benefits']

  constructor() {
    this.dataSource = new RoleRead2DataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
