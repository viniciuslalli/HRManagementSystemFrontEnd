import { Component, OnInit } from '@angular/core';
import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contract-update',
  templateUrl: './contract-update.component.html',
  styleUrls: ['./contract-update.component.css']
})
export class ContractUpdateComponent implements OnInit {

  contract!: Contract 

  constructor(
    private ContractService: ContractService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ContractService.readById(id).subscribe(
        contract => {
          this.contract = contract;
          console.log(this.contract);
        },
        error => {
          console.error('Erro ao carregar contract:', error);
        }
      );
    }
  }

  updateContract(): void{
    this.ContractService.update(this.contract).subscribe(() => {
      this.ContractService.showMessage('Contract updated with success!');
      this.router.navigate(['/contracts']);
    })
  }

  cancel(): void{
    this.router.navigate(["/contracts"]);
  }

}
