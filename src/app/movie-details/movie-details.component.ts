import { Component, EventEmitter, OnInit } from '@angular/core';
import { MovieDetailsService } from './movie-details.service';
import { ActivatedRoute } from '@angular/router';
import { Cinema, Format, Language, Movie, ResponseOne, ResponseWithError, Show } from '../interfaces/interfaces';
import { CinemaService } from '../cinemas/cinema.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})

export class MovieDetailsComponent implements OnInit {
  movieId : number = 0;
  cinemaId : number | null = null;
  movie : Movie | null = null;
  cinemas : Cinema[] = [];
  shows : Show[] = [];
  days: string[] = [];
  formats: Format[] = [];
  languages: Language[] = [];
  selectedCinema$: BehaviorSubject<Cinema | null> = new BehaviorSubject<Cinema | null>(null);


  constructor(
    private service : MovieDetailsService,
    private route: ActivatedRoute,
    private cinemaService: CinemaService
  ) { }
  
  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovieDetails(this.movieId);
    this.route.queryParams.subscribe(params => {
      this.cinemaId = params['cinemaId'] ? Number(params['cinemaId']) : null;
      if(this.cinemaId != null){
        this.loadCinema(this.cinemaId);
        this.loadShows(this.movieId, this.cinemaId);
      }
    });
    
    this.loadCinemas();
    this.days = this.getNextDays();
    this.loadLanguages();
    this.loadFormats();
  }
  getNextDays():string[]{
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    const today = new Date();
    const todayIndex = today.getDay();
    const daysArray: string[] = []
    for(let i = 0; i < 7 ; i++){
      const nextDayIndex = (todayIndex + i) % 7;
      daysArray.push(daysOfWeek[nextDayIndex]);
    }
    daysArray[0]="Hoy";
    daysArray[1]="Mañana"
    return daysArray;
  }
  loadShows(movieId: number, cinemaId: number) : void {

  }

  loadMovieDetails(id: number) : void {
      this.service.getMovieDetails(id).subscribe({
        next: (response) =>{
          this.movie = response.data;
        },error:() =>{
          console.log('Ocurrio un error al buscar el cine seleccionado');
          this.movie = null;
        }
      });
  }
  loadFormats(){
    this.service.getAllFormats().subscribe({
        next: (response) =>{
          this.formats = response.data;
          console.log("formato")
          console.log(response)
        },error:() =>{
          console.log('Ocurrio un error al buscar el cine seleccionado');
          this.formats = [];
        }
      });
  }
  loadLanguages(){
    this.service.getAllLanguages().subscribe({
      next: (response) =>{
        this.languages = response.data;
        console.log("lenguaje")
        console.log(response)
      },error:() =>{
        console.log('Ocurrio un error al buscar el cine seleccionado');
        this.languages = [];
      }
    });    
  }

  loadCinemas() {
    this.cinemaService.getAllCinemas().subscribe({
      next: (response) => {
        this.cinemas = response.data;
      },
      error: () => {  
        console.error('Error getting cinemas:');
        this.cinemas = [];
      }
    });
  }

  loadCinema(id : number) {
    this.cinemaService.getOneCinema(id).subscribe({
      next: (response) => {
        this.selectedCinema$.next(response.data);
        console.log("Desde el load Cinema ",response.data)
      },
      error: () => {  
        console.error('Error getting cinemas:');
        this.selectedCinema$.next(null);
;
      }
    });
  }

  handleItemSelected(item: Cinema | { clear: string }): void {
    if ('clear' in item) {
      this.selectedCinema$.next(null);
    } else {
      this.selectedCinema$.next(item);
      console.log('cinema seleccionado en handle', item)  
    }
  }
  
}
