import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department.model';

@Component({
  selector: 'app-department-delete',
  templateUrl: './department-delete.component.html',
  styleUrls: ['./department-delete.component.css']
})
export class DepartmentDeleteComponent implements OnInit {

  department!: Department;

  constructor(
    private DepartmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.DepartmentService.readById(id!).subscribe((department) => {
      this.department = department;
    });
  }

  delete(): void {
    this.DepartmentService.delete(this.department.id).subscribe(() => {
      this.DepartmentService.showMessage("Department deleted with success!");
      this.router.navigate(["/departments"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/departments"]);
  }

}