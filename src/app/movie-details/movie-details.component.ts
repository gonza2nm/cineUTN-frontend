import { Component, EventEmitter, OnInit } from '@angular/core';
import { MovieDetailsService } from './movie-details.service';
import { ActivatedRoute } from '@angular/router';
import { Cinema, Format, Language, Movie, Show } from '../interfaces/interfaces';
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
  cinema: Cinema | null = null;
  isCinemaLoaded: boolean = false;

  constructor(
    private service : MovieDetailsService,
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams.subscribe(params => {
      this.cinemaId = params['cinemaId'] ? Number(params['cinemaId']) : null;
    });
    this.loadMovieDetails(this.movieId);
    this.loadDataSelector();
    this.days = this.getNextDays();
    this.loadLanguages();
    this.loadFormats();
  }
  
  loadDataSelector(){
    this.service.getAllCinemasByMovie(this.movieId).subscribe({
      next: (cinemas) => {
        this.cinemas = cinemas
        console.log(cinemas)
        console.log("cinemas desde el loadCinemas ",this.cinemas);
          if(this.cinemaId != null){
            this.cinema = this.cinemas.find(cinema => cinema.id == this.cinemaId)||null;
            this.isCinemaLoaded = true;
            this.loadShows(this.movieId, this.cinemaId);
          }
      },
      error: () => {  
        console.error('Error loading Data:');
        this.cinemas = [];
      }
    });  
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

  loadShows(movieId: number, cinemaId: number){
    
  }

  loadMovieDetails(id: number){
      this.service.getMovieDetails(id).subscribe({
        next: (movie) =>{
          this.movie = movie
        },error:() =>{
          console.log('Ocurrio un error al buscar el cine seleccionado');
          this.movie = null;
        }
      });
  }

  loadFormats(){
    this.service.getAllFormats().subscribe({
        next: (format) =>{
          this.formats = format
        },error:() =>{
          console.log('Ocurrio un error al buscar el cine seleccionado');
          this.formats = [];
        }
      });
  }
  loadLanguages(){
    this.service.getAllLanguages().subscribe({
      next: (language) =>{
        this.languages = language
      },error:() =>{
        console.log('Ocurrio un error al buscar el cine seleccionado');
        this.languages = [];
      }
    });    
  }

  handleItemSelected(item: Cinema | { clear: string }): void {
    if ('clear' in item) {
      this.cinema = null
    } else {
      this.cinema = item
      console.log('cinema seleccionado en handle', item)  
    }
  }

}
