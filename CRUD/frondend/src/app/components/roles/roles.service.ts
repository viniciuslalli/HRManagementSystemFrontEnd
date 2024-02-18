import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EMPTY, Observable } from "rxjs";
import { Role } from "./roles.model";

@Injectable({
  providedIn: "root", // singleton, uma classe que tem apenas uma instância
})
export class RoleService {

  baseUrlGetAll = "http://localhost:8080/api/role/getAll";
  baseUrlGetById = "http://localhost:8080/api/role/get";
  baseUrlUpdateById = "http://localhost:8080/api/role/update";
  baseUrlDeleteById = "http://localhost:8080/api/role/deleteById";
  baseUrlAddRole = "http://localhost:8080/api/role/add";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "x", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-sucess"],
    });
  }

  create(role: Role): Observable<Role> {
    return this.http.post<Role>(this.baseUrlAddRole, role).pipe(
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

  read(): Observable<Role[]> {
    return this.http.get<any>(this.baseUrlGetAll).pipe(
      map(response => {
        if (response.success && response.data){
          
          return response.data.map((data: any) => ({
            id: data.id,
            name: data.name,
            position: data.position,
            benefits: data.benefits
          }));
        } else {
          // return an empty list.
          return [];
        }
      }),
      catchError((e) => this.errorHandler(e))
    ); 
  }

  readById(id: string): Observable<any> {
    const url = `${this.baseUrlGetById}/${id}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.success && response.data){
          return {
            id: id,
            name: response.data.name,
            benefits: response.data.benefits,
            position: response.data.position
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

  update(role: Role): Observable<Role> {
    const url = `${this.baseUrlUpdateById}/${role.id}`;
    return this.http.put<Role>(url, role).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }

  delete(id: number | undefined): Observable<Role> {
    const url = `${this.baseUrlDeleteById}/${id}`;
    return this.http.delete<Role>(url).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }
}
