import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Employeeservice } from './employee.service';
import { Addemployee } from './addemployee';
import { Updateemployee } from './updateemployee';
import { ViewemployeesComponent } from './viewemployees/viewemployees.component';
import { EmployeelistComponent } from './employee-list/employee-list.component';
import { UserlistComponent } from './userlist/userlist.component';
import { EmployeeformComponent } from './employeeform/employeeform.component';
const routes: Routes = [
  {path:'employee-list',component:EmployeelistComponent},
  {path:'viewemployee',component:ViewemployeesComponent},
  {path:'employees/add',component:ViewemployeesComponent},
  {path:'userlist',component:UserlistComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
