import { Component, OnInit } from '@angular/core';
import { RoleService } from '../roles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../roles.model';

@Component({
  selector: 'app-roles-update',
  templateUrl: './roles-update.component.html',
  styleUrls: ['./roles-update.component.css']
})
export class RolesUpdateComponent implements OnInit {

  role!: Role

  constructor(
    private RoleService: RoleService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.RoleService.readById(id).subscribe(
        role => {
          this.role = role;
        },
        error => {
          console.error('Erro ao carregar role:', error);
        }
      );
    }
  }

  updateRole(): void{
    this.RoleService.update(this.role).subscribe(() => {
      this.RoleService.showMessage('Roles updated with success!');
      this.router.navigate(['/roles']);
    })
  }

  cancel(): void{
    this.router.navigate(["/roles"]);
  }

}
