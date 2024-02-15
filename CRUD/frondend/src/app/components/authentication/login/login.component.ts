import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  shake: boolean = false; // Adiciona uma variável para controlar a animação de shake

  constructor(private authService: AuthService) {}

  login() {
    // Lógica de autenticação
    if (this.authService.login(this.username, this.password)) {
      console.log('Usuário autenticado com sucesso!');
    } else {
      console.log('Nome de usuário ou senha inválidos.');
      this.shake = true; // Ativa a animação de shake
      setTimeout(() => {
        this.shake = false; // Desativa a animação de shake após 0.5 segundos
      }, 500);
    }
  }
}