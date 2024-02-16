import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department.model';

@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.css']
})
export class DepartmentUpdateComponent implements OnInit {


  department!: Department 

  constructor(
    private DepartmentService: DepartmentService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') 
    this.DepartmentService.readById(id!).subscribe(department => {
      this.department = department;
    })
  }

  updateDepartment(): void{
    this.DepartmentService.update(this.department).subscribe(() => {
      this.DepartmentService.showMessage('Department updated with success!');
      this.router.navigate(['/departments']);
    })
  }

  cancel(): void{
    this.router.navigate(["/departments"]);
  }

}
