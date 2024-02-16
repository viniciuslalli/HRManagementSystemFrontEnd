import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { Department } from '../department.model';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  department: Department = {
    departmentName: '',
    description:''
  }

  constructor(private departmentService: DepartmentService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createDepartment(): void {
    this.departmentService.create(this.department).subscribe(() => {
      this.departmentService.showMessage('Department created!')
      this.router.navigate(['/departments'])
    })

  }

  cancel(): void {
    this.router.navigate(['/departments'])
  }

}
