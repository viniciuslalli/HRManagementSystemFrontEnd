import { Component, OnInit } from '@angular/core';
import { Role } from '../roles.model';
import { RoleService } from '../roles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-roles-delete',
  templateUrl: './roles-delete.component.html',
  styleUrls: ['./roles-delete.component.css']
})
export class RolesDeleteComponent implements OnInit {

  role!: Role;

  constructor(
    private RoleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.RoleService.readById(id!).subscribe((role) => {
      this.role = role;
    });
  }

  delete(): void {
    this.RoleService.delete(this.role.id).subscribe(() => {
      this.RoleService.showMessage("Role deleted with success!");
      this.router.navigate(["/roles"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/roles"]);
  }

}
