import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { Employee } from "./employee.model";

@Injectable({
  providedIn: "root", // singleton, uma classe que tem apenas uma instância
})
export class EmployeeService {
  baseUrl = "http://localhost:3001/employees";
  baseUrlGetAll = "http://localhost:8080/api/employee/getAll";
  baseUrlGetById = "http://localhost:8080/api/employee/get";
  baseUrlUpdateById = "http://localhost:8080/api/employee/update";
  baseUrlDeleteById = "http://localhost:8080/api/employee/deleteById";
  baseUrlAddEmployee = "http://localhost:8080/api/employee/add";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "x", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-sucess"],
    });
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrlAddEmployee, employee).pipe(
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

  read(): Observable<Employee[]> {
    return this.http.get<any>(this.baseUrlGetAll).pipe(
      map(response => {
        if (response.success && response.data){
          // displayedColumns = ['id', 'name', 'surname', 'salary', 'gender', 'address', 'email', 'phonenumber', 'nationality', 'dateOfBirth', 'action']
          return response.data.map((data: any) => ({
            id: data.id,
            name: data.name,
            surname: data.surname,
            salary: data.salary,
            gender: data.gender,
            address: data.address,
            email: data.email,
            phoneNumber: data.phoneNumber,
            nationality: data.nationality,
            dateOfBirth: data.dateOfBirth
          }));
        } else {
          // return an empty list.
          return [];
        }
      }),
      catchError((e) => this.errorHandler(e))
    ); 
  }

  readById(id: string): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }

  update(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }

  delete(id: number | undefined): Observable<Employee> {
    const url = `${this.baseUrlDeleteById}/${id}`;
    return this.http.delete<Employee>(url).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }
}
