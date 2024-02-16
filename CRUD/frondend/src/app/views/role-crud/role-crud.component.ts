import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-role-crud',
  templateUrl: './role-crud.component.html',
  styleUrls: ['./role-crud.component.css']
})
export class RoleCrudComponent implements OnInit {

  constructor(private router: Router, private HeaderService: HeaderService) {
    HeaderService.headerData = {
      title: "Register of Roles",
      icon: 'person_add_alt_1',
      routeUrl: './roles',
    };
   }

  ngOnInit(): void {
  }

  navigateToRolesCreate(): void {
    this.router.navigate(['/roles/create'])
  }

}
