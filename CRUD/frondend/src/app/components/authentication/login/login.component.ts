import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  shake: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/']); // Redireciona para a página inicial se o login for bem-sucedido
      } else {
        console.log('Nome de usuário ou senha inválidos.');
        this.shake = true;
        setTimeout(() => {
          this.shake = false;
        }, 500);
      }
    });
  }
}