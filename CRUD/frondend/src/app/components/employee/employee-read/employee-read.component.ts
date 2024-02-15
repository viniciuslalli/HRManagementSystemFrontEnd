import { Component, OnInit } from "@angular/core";
import { Employee } from "../employee.model";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-employee-read",
  templateUrl: "./employee-read.component.html",
  styleUrls: ["./employee-read.component.css"],
})
export class EmployeeReadComponent implements OnInit {

  employees!: Employee[]
  displayedColumns = ['id', 'name', 'price', 'action']

  constructor(private EmployeeService: EmployeeService) {}

  ngOnInit(): void {
    this.EmployeeService.read().subscribe((employees) => {
      this.employees = employees;
      console.log(employees);
    });
  }
}
