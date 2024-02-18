import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { Department } from "./department.model";
import { DepartmentReponse } from "./department-response.model";

@Injectable({
  providedIn: "root", // singleton, uma classe que tem apenas uma instância
})
export class DepartmentService {
  baseUrl = "http://localhost:3001/departments";
  baseUrlGetAll = "http://localhost:8080/api/department/getAll";
  baseUrlGetById = "http://localhost:8080/api/department/get";
  baseUrlUpdateById = "http://localhost:8080/api/department/update";
  baseUrlDeleteById = "http://localhost:8080/api/department/deleteById";
  baseUrlAddDepartment = "http://localhost:8080/api/department/add";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "x", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-sucess"],
    });
  }

  create(department: Department): Observable<Department> {
    return this.http.post<Department>(this.baseUrlAddDepartment, department).pipe(
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

  read(): Observable<Department[]> {
    return this.http.get<any>(this.baseUrlGetAll).pipe(
      map(response => {
        if (response.success && response.data){
          
          return response.data.map((data: any) => ({
            id: data.id,
            departmentName: data.departmentName,
            description: data.description
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
            departmentName: response.data.departmentName,
            description: response.data.description
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

  update(department: Department): Observable<Department> {
    const url = `${this.baseUrlUpdateById}/${department.id}`;
    return this.http.put<Department>(url, department).pipe(
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
}
