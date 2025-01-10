import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { HomeComponent } from './home/home.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CinemaEditComponent } from './cinema-edit/cinema-edit.component';
import { RegisterComponent } from './register/register.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { TheatersComponent } from './theaters/theaters.component';
import { TheatersByCinemaComponent } from './theaters-by-cinema/theaters-by-cinema.component';
import { TheaterEditComponent } from './theater-edit/theater-edit.component';
import { ShowtimesComponent } from './showtimes/showtimes.component';
import { ShowtimesByCinemaComponent } from './showtimes-by-cinema/showtimes-by-cinema.component';
import { ShowtimesEditComponent } from './showtimes-edit/showtimes-edit.component';
import { GenresComponent } from './genres/genres.component';
import { GenresEditComponent } from './genres-edit/genres-edit.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { BuyComponent } from './buy/buy.component';
import { AuthManagerGuard } from './auth/authManager.guard';
import { ManagersComponent } from './managers/managers.component';
import { BuyDetailsComponent } from './buy-details/buy-details.component';
import { AuthGeneralGuard } from './auth/authGeneral.guard';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGeneralGuard] },

  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'buy/:id', component: BuyComponent, canActivate: [AuthGeneralGuard] },
  { path: 'buy-details/:id', component: BuyDetailsComponent, canActivate: [AuthGeneralGuard] },

  { path: 'manager-home', component: ManagerHomeComponent, canActivate: [AuthManagerGuard], },

  { path: 'manager-home/cinemas', component: CinemasComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/cinemas/new', component: CinemaEditComponent, canActivate: [AuthManagerGuard], },//uso mismo componente para editar y crear
  { path: 'manager-home/cinemas/:id', component: CinemaEditComponent, canActivate: [AuthManagerGuard], }, //cuidado! si la ruta del new queda abajo de la del id entonces toma a "new" como ID y no funciona.

  { path: 'manager-home/theaters', component: TheatersComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/theaters/:cid', component: TheatersByCinemaComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/theaters/:cid/new', component: TheaterEditComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/theaters/:cid/edit/:tid', component: TheaterEditComponent, canActivate: [AuthManagerGuard], },

  { path: 'manager-home/showtimes', component: ShowtimesComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/showtimes/:cid', component: ShowtimesByCinemaComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/showtimes/:cid/new', component: ShowtimesEditComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/showtimes/:cid/edit/:sid', component: ShowtimesEditComponent, canActivate: [AuthManagerGuard], },

  { path: 'manager-home/genres', component: GenresComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/genres/:gid', component: GenresEditComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/genres/new', component: GenresEditComponent, canActivate: [AuthManagerGuard], },

  { path: 'manager-home/movies', component: MoviesComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/movies/new', component: MovieEditComponent, canActivate: [AuthManagerGuard], },
  { path: 'manager-home/movies/:id', component: MovieEditComponent, canActivate: [AuthManagerGuard], },

  { path: 'manager-home/managers', component: ManagersComponent, canActivate: [AuthManagerGuard] },
  { path: 'manager-home/managers/new', component: RegisterComponent, canActivate: [AuthManagerGuard] },
  { path: 'manager-home/managers/:id', component: RegisterComponent, canActivate: [AuthManagerGuard] },

  { path: 'manager-home/genres', component: GenresComponent, canActivate: [AuthManagerGuard] },
  { path: 'manager-home/genres/:gid', component: GenresEditComponent, canActivate: [AuthManagerGuard] },
  { path: 'manager-home/genres/new', component: GenresEditComponent, canActivate: [AuthManagerGuard] },

  { path: 'manager-home/events', component: EventsComponent, canActivate: [AuthManagerGuard] },

  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

