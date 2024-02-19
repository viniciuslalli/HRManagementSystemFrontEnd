import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../employee.service";
import { Employee } from "../employee.model";

@Component({
  selector: "app-employee-delete",
  templateUrl: "./employee-delete.component.html",
  styleUrls: ["./employee-delete.component.css"],
})
export class EmployeeDeleteComponent implements OnInit {
  employee!: Employee;

  constructor(
    private EmployeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.EmployeeService.readById(id!).subscribe((employee) => {
      this.employee = employee;
    });

    // Aqui vou ter que chamaro  read byId assim eu consigo recuperar o rolename e o departmentname pelo id dos mesmos e mostrar sem ser do tipo Selection mas tenho 
    // que guardar o id
    // Ou simplesmete criar um novo model de response... e mudar no readById para o employeeResponse ele vai ser usado somenete na componente de employee...

    // this.roleService.read().subscribe((roles) => {
    //   this.roles = roles;
    //   console.log(roles);
    // });

    // this.departmentService.read().subscribe((departments) => {
    //   this.departments = departments;
    //   console.log(departments);
    // });
  }

  delete(): void {
    this.EmployeeService.delete(this.employee.id).subscribe(() => {
      this.EmployeeService.showMessage("employee deleted with success!");
      this.router.navigate(["/employees"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/employees"]);
  }
}
