import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './components/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verifica se o usuário está logado
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']); // Redireciona para a página inicial se estiver autenticado
    }
  }

  onLoggedIn() {
    // Lógica para redirecionar ou atualizar a página após o login bem-sucedido
    // Por exemplo:
    // this.router.navigate(['/dashboard']); // Se estiver usando o roteador
    // window.location.reload(); // Para recarregar a página após o login
  }
}