import { Component, OnInit } from '@angular/core';
import { Role } from '../roles.model';
import { RoleService } from '../roles.service';

@Component({
  selector: 'app-roles-read',
  templateUrl: './roles-read.component.html',
  styleUrls: ['./roles-read.component.css']
})
export class RolesReadComponent implements OnInit {

  roles!: Role[]
  displayedColumns = ['id', 'name', 'benefits', 'action']


  constructor(private RoleService: RoleService) { }

  ngOnInit(): void {
    this.RoleService.read().subscribe((roles) => {
      this.roles = roles;
      console.log(roles);
    });
  }

}
