import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-department-crud',
  templateUrl: './department-crud.component.html',
  styleUrls: ['./department-crud.component.css']
})
export class DepartmentCrudComponent implements OnInit {

  constructor(private router: Router, private HeaderService: HeaderService) { 
    HeaderService.headerData = {
      title: "Register of Deparments",
      icon: 'person_add_alt_1',
      routeUrl: './departments',
    };
  }

  ngOnInit(): void {
  }

  navigateToDepartmentCreate(): void {
    this.router.navigate(['/departments/create'])
  }

}
