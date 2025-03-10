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
import { AuthGuard, Role } from './auth/auth.guard';
import { ManagersComponent } from './managers/managers.component';
import { BuyDetailsComponent } from './buy-details/buy-details.component';
import { EventsComponent } from './events/events.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventsUserViewComponent } from './events-user-view/events-user-view.component';
import { BuyValidateQrComponent } from './buy-validate-qr/buy-validate-qr.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ProductsComponent } from './products/products.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { PromotionsEditComponent } from './promotions-edit/promotions-edit.component';
import { PromotionslistComponent } from './promotionslist/promotionslist.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard(Role.USER)] },
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard(Role.USER)] },
  { path: 'events', component: EventsUserViewComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'promociones', component: PromotionslistComponent },

  { path: 'buy/:id', component: BuyComponent, canActivate: [AuthGuard(Role.USER)] },
  { path: 'buy-details/:id', component: BuyDetailsComponent, canActivate: [AuthGuard(Role.USER)] },

  { path: 'manager-home', component: ManagerHomeComponent, canActivate: [AuthGuard(Role.MANAGER)], },

  { path: 'manager-home/cinemas', component: CinemasComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/cinemas/new', component: CinemaEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/cinemas/:id', component: CinemaEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },

  { path: 'manager-home/theaters', component: TheatersComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/theaters/:cid', component: TheatersByCinemaComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/theaters/:cid/new', component: TheaterEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/theaters/:cid/edit/:tid', component: TheaterEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },

  { path: 'manager-home/showtimes', component: ShowtimesComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/showtimes/:cid', component: ShowtimesByCinemaComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/showtimes/:cid/new', component: ShowtimesEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/showtimes/:cid/edit/:sid', component: ShowtimesEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },

  { path: 'manager-home/genres', component: GenresComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/genres/:gid', component: GenresEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/genres/new', component: GenresEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },

  { path: 'manager-home/movies', component: MoviesComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/movies/new', component: MovieEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/movies/:id', component: MovieEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },

  { path: 'manager-home/managers', component: ManagersComponent, canActivate: [AuthGuard(Role.MANAGER)] },
  { path: 'manager-home/managers/new', component: RegisterComponent, canActivate: [AuthGuard(Role.MANAGER)] },
  { path: 'manager-home/managers/:id', component: RegisterComponent, canActivate: [AuthGuard(Role.MANAGER)] },

  { path: 'manager-home/genres', component: GenresComponent, canActivate: [AuthGuard(Role.MANAGER)] },
  { path: 'manager-home/genres/:gid', component: GenresEditComponent, canActivate: [AuthGuard(Role.MANAGER)] },
  { path: 'manager-home/genres/new', component: GenresEditComponent, canActivate: [AuthGuard(Role.MANAGER)] },

  { path: 'manager-home/events', component: EventsComponent, canActivate: [AuthGuard(Role.MANAGER)] },
  { path: 'manager-home/events/new', component: EventEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/events/:id', component: EventEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },

  { path: 'manager-home/buy-validate-qr', component: BuyValidateQrComponent, canActivate: [AuthGuard(Role.MANAGER)] },

  { path: 'manager-home/promotions', component: PromotionsComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/promotion/new', component: PromotionsEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/promotions/:code', component: PromotionsEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },

  { path: 'manager-home/products', component: ProductsComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/products/new', component: ProductsEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },
  { path: 'manager-home/products/:id', component: ProductsEditComponent, canActivate: [AuthGuard(Role.MANAGER)], },

  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

