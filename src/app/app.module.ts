import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { SelectorComponent } from './selector/selector.component';
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
import { NextReleasesSliderComponent } from './next-releases-slider/next-releases-slider.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { BuyComponent } from './buy/buy.component';
import { BuyDetailsComponent } from './buy-details/buy-details.component';
import { ManagersComponent } from './managers/managers.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EventsComponent } from './events/events.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventsUserViewComponent } from './events-user-view/events-user-view.component';
import { BuyValidateQrComponent } from './buy-validate-qr/buy-validate-qr.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { ProductsComponent } from './products/products.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { PromotionsEditComponent } from './promotions-edit/promotions-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    ManagerHomeComponent,
    HomeComponent,
    SliderComponent,
    SelectorComponent,
    CinemasComponent,
    MovieDetailsComponent,
    CinemaEditComponent,
    RegisterComponent,
    MyAccountComponent,
    TheatersComponent,
    TheatersByCinemaComponent,
    TheaterEditComponent,
    ShowtimesComponent,
    ShowtimesByCinemaComponent,
    ShowtimesEditComponent,
    GenresComponent,
    GenresEditComponent,
    NextReleasesSliderComponent,
    MoviesComponent,
    MovieEditComponent,
    BuyComponent,
    BuyDetailsComponent,
    ManagersComponent,
    EventsComponent,
    EventEditComponent,
    EventsUserViewComponent,
    BuyValidateQrComponent,
    PromotionsComponent,
    ProductsComponent,
    ProductsEditComponent,
    PromotionsEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
