import { Component, OnInit } from '@angular/core';
import { Show } from '../interfaces/interfaces';
import { ShowtimesByCinemaService } from './showtimes-by-cinema.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-showtimes-by-cinema',
  templateUrl: './showtimes-by-cinema.component.html',
  styleUrls: ['./showtimes-by-cinema.component.css']
})
export class ShowtimesByCinemaComponent implements OnInit {
  showtimes : Show[] = [];  
  errorMessage: string | null = null;
  loading: boolean = true;
  cinemaId : number | null = null;
  

  constructor(
    private service : ShowtimesByCinemaService,
    private route: ActivatedRoute,
    private router : Router
  ){}
  
  ngOnInit(): void {
    this.cinemaId = this.route.snapshot.params['cid'];
    this.findCinema();
  }

  findCinema(){
    if(this.cinemaId !== null){
      this.service.getCinema(this.cinemaId).subscribe({
        next: (response) => {
          this.errorMessage = null;
          this.loadShowtimes();
        },
        error: () => {  
          this.errorMessage = 'Cinema doesn´t exist';
          console.error(this.errorMessage);
          this.loading = false;
          this.router.navigate(["/manager-home/showtimes"]);
        }
      });  
    }
  }
  loadShowtimes(){
    if(this.cinemaId !== null){
      this.service.getShowtimesByCinema(this.cinemaId).subscribe({
        next: (response) => {
          this.showtimes = response.data;
          this.errorMessage = null;
          this.loading = false;
        },
        error: () => {  
          this.errorMessage = 'An error occurred while fetching showtimes.';
          console.error('Error getting showtimes:');
          this.loading = false;
          this.router.navigate(["/manager-home/showtimes"]);
        }
      });
    }else{
      this.router.navigate(["/manager-home/showtimes"]);
    }
  }

   formatDate(d: Date,format: string):string
  {
    const date = new Date(d);
    if(format === "DD/MM-HH:MM"){
      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const hora = date.getHours().toString().padStart(2, '0');
      const minutos = date.getMinutes().toString().padStart(2, '0');
      return `${dia}/${mes} ${hora}:${minutos}`;
    }else if(format === "HH:MM"){
      const hora = date.getHours().toString().padStart(2, '0');
      const minutos = date.getMinutes().toString().padStart(2, '0');
      return `${hora}:${minutos}`;
    } else{
      return date.toString();
    }
  }
}