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
import { BuyDetailsComponent } from './buy-details/buy-details.component';
import { ManagersComponent } from './managers/managers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'login', component: LoginComponent },

  { path: 'movies/:id', component: MovieDetailsComponent },

  { path: 'manager-home', component: ManagerHomeComponent },

  { path: 'manager-home/cinemas', component: CinemasComponent },
  { path: 'manager-home/cinemas/new', component: CinemaEditComponent },//uso mismo componente para editar y crear
  { path: 'manager-home/cinemas/:id', component: CinemaEditComponent }, //cuidado! si la ruta del new queda abajo de la del id entonces toma a "new" como ID y no funciona.

  { path: 'manager-home/theaters', component: TheatersComponent },
  { path: 'manager-home/theaters/:cid', component: TheatersByCinemaComponent },
  { path: 'manager-home/theaters/:cid/new', component: TheaterEditComponent },
  { path: 'manager-home/theaters/:cid/edit/:tid', component: TheaterEditComponent },

  { path: 'manager-home/showtimes', component: ShowtimesComponent },
  { path: 'manager-home/showtimes/:cid', component: ShowtimesByCinemaComponent },
  { path: 'manager-home/showtimes/:cid/new', component: ShowtimesEditComponent },
  { path: 'manager-home/showtimes/:cid/edit/:sid', component: ShowtimesEditComponent },

  { path: 'manager-home/genres', component: GenresComponent },
  { path: 'manager-home/genres/:gid', component: GenresEditComponent },
  { path: 'manager-home/genres/new', component: GenresEditComponent },

  { path: 'manager-home/movies', component: MoviesComponent },
  { path: 'manager-home/movies/new', component: MovieEditComponent },
  { path: 'manager-home/movies/:id', component: MovieEditComponent },

  { path: 'manager-home/managers', component: ManagersComponent },
  { path: 'manager-home/managers/new', component: RegisterComponent },
  { path: 'manager-home/managers/:id', component: RegisterComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'buy', component: BuyComponent },

  {path: 'manager-home/genres', component: GenresComponent},
  {path: 'manager-home/genres/:gid', component: GenresEditComponent},
  {path: 'manager-home/genres/new', component: GenresEditComponent},
  
  { path: 'register', component: RegisterComponent},
  { path: 'my-account', component: MyAccountComponent},
  { path: 'buy', component: BuyComponent},
  { path: 'buy-details', component: BuyDetailsComponent},
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
