import { Component, OnInit } from '@angular/core';
import { Role } from '../roles.model';
import { RoleService } from '../roles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-create',
  templateUrl: './roles-create.component.html',
  styleUrls: ['./roles-create.component.css']
})
export class RolesCreateComponent implements OnInit {

  role: Role = {
    name: '',
    benefits:''
  }

  constructor(private roleService: RoleService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createRole(): void {
    this.roleService.create(this.role).subscribe(() => {
      this.roleService.showMessage('Role created!')
      this.router.navigate(['/roles'])
    })

  }

  cancel(): void {
    this.router.navigate(['/roles'])
  }

}
