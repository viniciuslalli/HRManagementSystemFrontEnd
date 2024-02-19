import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  
  employee!: Employee 


  constructor(private EmployeeService: EmployeeService, 
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') 
    this.EmployeeService.readById(id!).subscribe(employee => {
      this.employee = employee;
    })

 
  }

  updateEmployee(): void{
    this.EmployeeService.update(this.employee).subscribe(() => {
      this.EmployeeService.showMessage('Employee updated with success!');
      this.router.navigate(['/employees']);
    })
  }

  cancel(): void{
    this.router.navigate(["/employees"]);
  }


}
