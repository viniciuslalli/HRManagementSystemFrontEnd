import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-contract-crud',
  templateUrl: './contract-crud.component.html',
  styleUrls: ['./contract-crud.component.css']
})
export class ContractCrudComponent implements OnInit {

  constructor(private router: Router, private HeaderService: HeaderService) { 
    HeaderService.headerData = {
      title: "Register of Contracts",
      icon: 'person_add_alt_1',
      routeUrl: './contracts',
    };
  }

  ngOnInit(): void {
  }

  navigateToDepartmentCreate(): void {
    this.router.navigate(['/contracts/create'])
  }

}
