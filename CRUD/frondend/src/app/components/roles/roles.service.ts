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
  baseUrl = "http://localhost:3001/roles";

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
    return this.http.post<Role>(this.baseUrl, role).pipe(
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
    return this.http.get<Role[]>(this.baseUrl).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }

  readById(id: string): Observable<Role> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Role>(url).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }

  update(role: Role): Observable<Role> {
    const url = `${this.baseUrl}/${role.id}`;
    return this.http.put<Role>(url, role).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }

  delete(id: number | undefined): Observable<Role> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Role>(url).pipe(
      //pipe para retornar um observable// caso cair em algum erro no tach ele vai cair no error
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    ); // ;
  }
}
