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
  days: {name:string, date: Date}[] = [];
  formats: Format[] = [];
  languages: Language[] = [];
  cinema: Cinema | null = null;
  isCinemaLoaded: boolean = false;
  isDetailsOpen : boolean = false;
  daySelected : string = "Hoy";
  filteredShows : Show[] = [];



  //Falta Tener en cuenta que cuando cambia el cine hay que hacer otra busqueda de shows y otros filtrados
  //obviamente tambien revisar que al ingresar a una pelicula sin seleccionar cine no haga la peticion sin sentido




  constructor(
    private service : MovieDetailsService,
    private route: ActivatedRoute,
  ) { }
  
  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.route.queryParams.subscribe(params => {
      this.cinemaId = params['cinemaId'] ? Number(params['cinemaId']) : null;
    });
    if(!this.cinemaId){
      this.isCinemaLoaded = true
    }
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

  getNextDays():{name: string, date: Date}[]{
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const daysArray: { name: string, date: Date }[] = [];
    const today = new Date();
    const todayIndex = today.getDay(); 
    let currentDate = new Date(today);
    daysArray.push({ name: "Hoy", date: new Date(today) });
    currentDate.setDate(today.getDate() + 1);
    daysArray.push({ name: "Mañana", date: new Date(currentDate)});
    for (let i = 2; i <= 7; i++) {
      currentDate.setDate(today.getDate() + i);
        const nextDayIndex = (todayIndex + i) % 7;
        daysArray.push({
          name: daysOfWeek[nextDayIndex], 
          date: new Date(currentDate)
        });
    }
    return daysArray;
  }

  loadShows(movieId: number, cinemaId: number){
    this.service.getAllShowsByMovieAndCinema(movieId,cinemaId).subscribe({
      next:(shows)=>{
        this.shows = shows;
        this.filterShows();
      },
      error: ()=>{
        console.log('Ocurrio un error al buscar el cine seleccionado');   
      }
    }) 
  }

  loadMovieDetails(id: number){
      this.service.getMovieDetails(id).subscribe({
        next: (movie) =>{
          this.movie = movie
        },error:() =>{
          console.log('Ocurrio un error al buscar la pelicula');
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

  filterShows(){
    const day = this.days.find(day=> day.name === this.daySelected)
    this.filteredShows = this.shows.filter(show => new Date(show.dayAndTime).getDate() === day?.date.getDate());
    if(this.filteredShows.length === 0){
      console.log("no se encontraron funciones que cumplan esas caracteristicas");
    }
  }

  getShowHourAndDay(show: Show){
    let date = new Date(show.dayAndTime)
    let hour = date.getUTCHours().toString().padStart(2,'0');
    let minutes = date.getUTCMinutes().toString().padStart(2,'0');
    const dateString = `${hour}:${minutes}`
    return dateString
  }

  handleItemSelected(item: Cinema | { clear: string }): void {
    if ('clear' in item) {
      this.cinema = null
    } else {
      this.cinema = item
      this.loadShows(this.movieId,this.cinema.id); 
    }
  }

  handleChangeOption(option: boolean){
    this.isDetailsOpen = option
  }

  handleDaySelected(day: string){
    this.daySelected = day
    this.filterShows()
  }

}
