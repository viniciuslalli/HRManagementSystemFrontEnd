import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { RoleService } from '../../roles/roles.service';
import { Role } from '../../roles/roles.model';
import { DepartmentService } from '../../departments/department.service';
import { Department } from '../../departments/department.model';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {


   employee: Employee = {
    name: '',
    surname: '',
    salary: null,
    gender: '',
    address: '', 
    email: '',
    phoneNumber: '',
    nationality: '',
    dateOfBirth: '',
    roleId: undefined,
    departmentId: undefined
  }

  roles!: Role[];
  departments!: Department[];

  constructor(private employeeService: EmployeeService,
     private router: Router,
     private roleService: RoleService,
     private departmentService: DepartmentService) { } // onde faço minhas injeções de dependências! 

  ngOnInit(): void {
    this.roleService.read().subscribe((roles) => {
      this.roles = roles;
      console.log(roles);
    });

    this.departmentService.read().subscribe((departments) => {
      this.departments = departments;
      console.log(departments);
    });
  }
  

  createEmployee(): void {
    this.employeeService.create(this.employee).subscribe(() => {
      this.employeeService.showMessage('Employee created!')
      this.router.navigate(['/employees'])
    })

  }

  cancel(): void {
    this.router.navigate(['/employees'])
  }
}
