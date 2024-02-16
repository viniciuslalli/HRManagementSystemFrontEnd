
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { EmployeeCrudComponent } from './views/employee-crud/employee-crud.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './components/employee/employee-delete/employee-delete.component';
import { DepartmentCreateComponent } from './components/departments/department-create/department-create.component';
import { DepartmentDeleteComponent } from './components/departments/department-delete/department-delete.component';
import { DepartmentReadComponent } from './components/departments/department-read/department-read.component';
import { DepartmentUpdateComponent } from './components/departments/department-update/department-update.component';
import { DepartmentCrudComponent } from './views/department-crud/department-crud.component';
import { RoleCrudComponent } from './views/role-crud/role-crud.component';
import { RolesCreateComponent } from './components/roles/roles-create/roles-create.component';
import { RolesDeleteComponent } from './components/roles/roles-delete/roles-delete.component';
import { RolesUpdateComponent } from './components/roles/roles-update/roles-update.component';


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "employees",
    component: EmployeeCrudComponent
  },
  {
    path: "employees/create",
    component: EmployeeCreateComponent
  },
  {
    path: "employees/update/:id",
    component: EmployeeUpdateComponent
  },
  {
    path: "employees/delete/:id",
    component: EmployeeDeleteComponent
  },
  {
    path: "departments",
    component: DepartmentCrudComponent
  },
  {
    path: "departments/create",
    component: DepartmentCreateComponent
  },
  {
    path: "departments/delete/:id",
    component: DepartmentDeleteComponent
  },
  {
    path: "departments/update/:id",
    component: DepartmentUpdateComponent
  },
  {
    path: "roles",
    component: RoleCrudComponent
  },
  {
    path: "roles/create",
    component: RolesCreateComponent
  },
  {
    path: "roles/delete/:id",
    component: RolesDeleteComponent
  },
  {
    path: "roles/update/:id",
    component: RolesUpdateComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
