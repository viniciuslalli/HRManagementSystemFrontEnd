import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { SignIn } from '../components/authentication/signin-model';

@Injectable({providedIn: "root"})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    // private signIn: SignInPayload
    
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Aqui você pode adicionar a lógica para recuperar o token de autenticação do localStorage
    // const token = localStorage.getItem('token');
    const token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aW5pbGFsbGkiLCJpYXQiOjE3MDgyNTE1NDAsImV4cCI6MTcwODI1MjE0MH0.pkwxdIqKccyemafmTz0wfDPXEk29JwrU5yueISd0MqI";

    // getTokenFromBack(signIn: this.signIn):Observable
    // Se houver um token, adiciona ao cabeçalho da requisição
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}