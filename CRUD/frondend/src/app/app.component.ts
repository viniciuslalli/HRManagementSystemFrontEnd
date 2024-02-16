import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './components/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  onLoggedIn() {

    // Lógica para redirecionar ou atualizar a página após o login bem-sucedido
    // Por exemplo:
    // this.router.navigate(['/dashboard']); // Se estiver usando o roteador
    // window.location.reload(); // Para recarregar a página após o login
  }
}