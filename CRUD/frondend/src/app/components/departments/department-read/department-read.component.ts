import { Component, OnInit } from '@angular/core';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-read',
  templateUrl: './department-read.component.html',
  styleUrls: ['./department-read.component.css']
})
export class DepartmentReadComponent implements OnInit {

  departments!: Department[]
  displayedColumns = ['id', 'departmentName', 'description', 'action']


  constructor(private DepartmentService: DepartmentService) { }

  ngOnInit(): void {
    this.DepartmentService.read().subscribe((deparments) => {
      this.departments = deparments;
      console.log(deparments);
    });
  }

}
