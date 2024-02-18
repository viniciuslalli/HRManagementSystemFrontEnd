import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { RedDirective } from './directives/red.directive';
import { ForDirective } from './directives/for.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { EmployeeCrudComponent } from './views/employee-crud/employee-crud.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeReadComponent } from './components/employee/employee-read/employee-read.component';
import { EmployeeRead2Component } from './components/employee/employee-read2/employee-read2.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './components/employee/employee-delete/employee-delete.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AuthService } from './components/authentication/auth.service';
import { DepartmentCreateComponent } from './components/departments/department-create/department-create.component';
import { DepartmentDeleteComponent } from './components/departments/department-delete/department-delete.component';
import { DepartmentReadComponent } from './components/departments/department-read/department-read.component';
import { DepartmentRead2Component } from './components/departments/department-read2/department-read2.component';
import { DepartmentUpdateComponent } from './components/departments/department-update/department-update.component';
import { DepartmentCrudComponent } from './views/department-crud/department-crud.component';
import { RolesCreateComponent } from './components/roles/roles-create/roles-create.component';
import { RolesDeleteComponent } from './components/roles/roles-delete/roles-delete.component';
import { RolesUpdateComponent } from './components/roles/roles-update/roles-update.component';
import { RolesReadComponent } from './components/roles/roles-read/roles-read.component';
import { RolesRead2Component } from './components/roles/roles-read2/roles-read2.component';
import { RoleCrudComponent } from './views/role-crud/role-crud.component';
import { AuthInterceptor } from './core/auth-interceptor.service';

registerLocaleData(localePt);




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    EmployeeCrudComponent,
    RedDirective,
    ForDirective,
    EmployeeCreateComponent,
    EmployeeReadComponent,
    EmployeeRead2Component,
    EmployeeUpdateComponent,
    EmployeeDeleteComponent,
    DepartmentCreateComponent,
    LoginComponent,
    DepartmentCreateComponent,
    DepartmentDeleteComponent,
    DepartmentReadComponent,
    DepartmentRead2Component,
    DepartmentUpdateComponent,
    DepartmentCrudComponent,
    RolesCreateComponent,
    RolesDeleteComponent,
    RolesUpdateComponent,
    RolesReadComponent,
    RolesRead2Component,
    RoleCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
