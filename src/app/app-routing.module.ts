import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "manager-home", component: ManagerHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
