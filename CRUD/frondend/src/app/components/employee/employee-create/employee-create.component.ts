import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {


  employee: Employee = {
    name: '',
    price: null 
  }


  constructor(private employeeService: EmployeeService,
     private router: Router) { } // onde faço minhas injeções de dependências! 

  ngOnInit(): void {
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
