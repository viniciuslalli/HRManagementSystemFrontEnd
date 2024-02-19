import { Component, OnInit } from '@angular/core';
import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../../employee/employee.service';
import { Employee } from '../../employee/employee.model';

@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.css']
})
export class ContractCreateComponent implements OnInit {

  contract: Contract = {
    employeeId: null,
    salary: {
      salaryAmountMonth: null,
      salaryAmountYear: null,
      salaryDate: ''
    },
    typeContract: '',
    hoursAmountMonth: null,
    startDateContract: '',
    endDateContract: ''

  }

  employees!: Employee[];

  constructor(private contractService: ContractService,
    private router: Router,
    private employeeSerivce: EmployeeService,
    ) { }

  ngOnInit(): void {
    this.employeeSerivce.read().subscribe((employees) => {
      this.employees = employees;
      console.log(employees);
    });
  }

  createRole(): void {
    this.contractService.create(this.contract).subscribe(() => {
      this.contractService.showMessage('Contract created!')
      this.router.navigate(['/contracts'])
    })

  }

  cancel(): void {
    this.router.navigate(['/contracts'])
  }


}
