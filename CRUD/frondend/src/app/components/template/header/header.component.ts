import { Route, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private HeaderService: HeaderService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  get title(): string{
    return this.HeaderService.headerData.title
  }

  get icon(): string{
    return this.HeaderService.headerData.icon
  }

  get routeUrl(): string{
    return this.HeaderService.headerData.routeUrl
  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redireciona para a página de login após fazer logout
  }
}
