import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { HomeComponent } from './home/home.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CinemaEditComponent } from './cinema-edit/cinema-edit.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'manager-home', component: ManagerHomeComponent },
  { path: 'manager-home/cinemas', component: CinemasComponent },
  { path: 'manager-home/cinemas/new', component: CinemaEditComponent },//uso mismo componente para editar y crear
  { path: 'manager-home/cinemas/:id', component: CinemaEditComponent }, //cuidado! si la ruta del new queda abajo de la del id entonces toma a "new" como ID y no funciona.
  { path: 'register', component: RegisterComponent},
  { path: "**", component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
