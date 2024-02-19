import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { Contract } from "./contract.model";


@Injectable({
  providedIn: "root", // singleton, uma classe que tem apenas uma instância
})
export class ContractService {
  baseUrl = "http://localhost:3001/departments";
  baseUrlGetAll = "http://localhost:8080/api/contract/getAll";
  baseUrlGetById = "http://localhost:8080/api/contract/get";
  baseUrlUpdateById = "http://localhost:8080/api/contract/update";
  baseUrlDeleteById = "http://localhost:8080/api/contract/deleteById";
  baseUrlAddContract = "http://localhost:8080/api/contract/add";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "x", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-sucess"],
    });
  }

  create(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.baseUrlAddContract, contract).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // faz um post em nosso banco de dados
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }

  // read(): Observable<Department[]> {
  //   return this.http.get<Department[]>(this.baseUrl).pipe(
  //     //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   ); // ;
  // }

  read(): Observable<Contract[]> {
    return this.http.get<any>(this.baseUrlGetAll).pipe(
      map(response => {
        if (response.success && response.data){
          // displayedColumns = ['id', 'typeContract', 'salaryAmountMonth', 'salaryAmountYear', 'hoursAmountMonth', 'salaryDate', 'startDateContract', 'endDateContract', 'action']
          return response.data.map((data: any) => ({
            id: data.id,
            employeeId: data.employeeId,
            salary: {
              salaryAmountMonth: data.salary.salaryAmountMonth,
              salaryAmountYear: data.salary.salaryAmountYear,
              salaryDate: data.salary.salaryDate
            },
            typeContract: data.typeContract,
            hoursAmountMonth: data.hoursAmountMonth,
            startDateContract: data.startDateContract,
            endDateContract: data.endDateContract
          }));
        } else {
          // return an empty list.
          return [];
        }
      }),
      catchError((e) => this.errorHandler(e))
    ); 
  }

  // readById(id: string): Observable<Department> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.get<Department>(url).pipe(
  //     //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   ); // ;
  // }

  readById(id: string): Observable<any> {
    const url = `${this.baseUrlGetById}/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.success && response.data){
          return {
            id: id,
            employeeId: response.data.employeeId,
            salary: {
              salaryAmountMonth: response.data.salary.salaryAmountMonth,
              salaryAmountYear: response.data.salary.salaryAmountYear,
              salaryDate: response.data.salary.salaryDate
            },
            typeContract: response.data.typeContract,
            hoursAmountMonth: response.data.hoursAmountMonth,
            startDateContract: response.data.startDateContract,
            endDateContract: response.data.endDateContract

          };
        } else {
          // Retorna null se não encontrar nenhum departamento
          return null;
        }
      }),
      catchError((e) => {
        this.errorHandler(e);
        // Retorna null em caso de erro
        return EMPTY;
      })
    );
  }

  update(contract: Contract): Observable<Contract> {
    const url = `${this.baseUrlUpdateById}/${contract.id}`;
    return this.http.put<Contract>(url, contract).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }

 

  delete(id: number | undefined): Observable<any> {
    const url = `${this.baseUrlDeleteById}/${id}`;
    return this.http.delete<any>(url).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // create(contract: Contract): Observable<Contract> {
  //   return this.http.post<Contract>(this.baseUrl, contract).pipe(
  //     //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   ); // faz um post em nosso banco de dados
  // }

  // errorHandler(e: any): Observable<any> {
  //   console.log(e);
  //   this.showMessage("Ocorreu um erro!", true);
  //   return EMPTY;
  // }

  // read(): Observable<Contract[]> {
  //   return this.http.get<Contract[]>(this.baseUrl).pipe(
  //     //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   ); // ;
  // }

  // readById(id: string): Observable<Contract> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.get<Contract>(url).pipe(
  //     //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   ); // ;
  // }

  // update(contract: Contract): Observable<Contract> {
  //   const url = `${this.baseUrl}/${contract.id}`;
  //   return this.http.put<Contract>(url, contract).pipe(
  //     //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   ); // ;
  // }

  // delete(id: number | undefined): Observable<Contract> {
  //   const url = `${this.baseUrl}/${id}`;
  //   return this.http.delete<Contract>(url).pipe(
  //     //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
  //     map((obj) => obj),
  //     catchError((e) => this.errorHandler(e))
  //   ); // ;
  // }
}
