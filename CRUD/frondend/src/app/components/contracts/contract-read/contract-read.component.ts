import { Component, OnInit } from '@angular/core';
import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-read',
  templateUrl: './contract-read.component.html',
  styleUrls: ['./contract-read.component.css']
})
export class ContractReadComponent implements OnInit {

  contracts!: Contract[]
  displayedColumns = ['id', 'employeeId', 'typeContract', 'salaryAmountMonth', 'salaryAmountYear', 'hoursAmountMonth', 'salaryDate', 'startDateContract', 'endDateContract', 'action']


  constructor(private ContractService: ContractService) { }

  ngOnInit(): void {
    this.ContractService.read().subscribe((contracts) => {
      this.contracts = contracts;
      console.log(contracts);
    });
  }
}
