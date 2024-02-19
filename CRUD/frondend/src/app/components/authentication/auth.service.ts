import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SignIn } from 'src/app/core/signin-payload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.isLoggedIn = !!localStorage.getItem('token'); // Verifica se há um token salvo no localStorage
  }

  signIn(signin: SignIn): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/auth/signin', signin).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // Salva o token no localStorage
        this.isLoggedIn = true;
      }),
      catchError(error => {
        console.error('Erro durante o login:', error);
        return of(false); // Retorna um Observable que emite false em caso de erro
      })
    );
  }

  login(username: string, password: string): Observable<boolean> {
    return this.signIn({ username, password }).pipe(
      tap(success => {
        if (!success) {
          this.isLoggedIn = false;
          localStorage.removeItem('token'); // Remove o token do localStorage em caso de falha no login
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove o token do localStorage
    this.isLoggedIn = false;
  }
}