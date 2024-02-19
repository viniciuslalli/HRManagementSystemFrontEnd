import { Component, OnInit } from '@angular/core';
import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contract-delete',
  templateUrl: './contract-delete.component.html',
  styleUrls: ['./contract-delete.component.css']
})
export class ContractDeleteComponent implements OnInit {

  contract!: Contract;

  constructor(
    private ContractService: ContractService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ContractService.readById(id!).subscribe((contract) => {
      this.contract = contract;
    });
  }

  delete(): void {
    this.ContractService.delete(this.contract.id).subscribe(() => {
      this.ContractService.showMessage("Contract deleted with success!");
      this.router.navigate(["/contracts"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/contracts"]);
  }

}
