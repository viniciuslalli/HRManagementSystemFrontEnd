import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-employee-crud',
  templateUrl: './employee-crud.component.html',
  styleUrls: ['./employee-crud.component.css']
})
export class EmployeeCrudComponent implements OnInit {

  constructor(private router: Router, private HeaderService: HeaderService) {
    HeaderService.headerData = {
      title: "Register of Employees",
      icon: 'person_add_alt_1',
      routeUrl: './employees',
    };
   }

  ngOnInit(): void {
  }

  navigateToEmployeesCreate(): void {
    this.router.navigate(['/employees/create'])
  }

}
