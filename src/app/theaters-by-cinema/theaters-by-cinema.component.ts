import { Component, OnInit } from '@angular/core';
import { Theater } from '../interfaces/interfaces.js';
import { TheaterByCinemaService } from './theater-by-cinema.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-theaters-by-cinema',
  templateUrl: './theaters-by-cinema.component.html',
  styleUrls: ['./theaters-by-cinema.component.css']
})
export class TheatersByCinemaComponent implements OnInit {
  theaters : Theater[] = [];  
  errorMessage: string | null = null;
  loading: boolean = true;
  cinemaId : number | null = null;
  

  constructor(
    private service : TheaterByCinemaService,
    private route: ActivatedRoute,
  ){}
  
  ngOnInit(): void {
    this.cinemaId = this.route.snapshot.params['cinemaid'];
    this.loadTheaters();

  }

  loadTheaters(){
    if(this.cinemaId !== null){
      this.service.getCinema(this.cinemaId).subscribe({
        next: (response) => {
          this.theaters = response.data.theaters;
          this.errorMessage = null;
          this.loading = false;
        },
        error: () => {  
          this.errorMessage = 'An error occurred while fetching cinemas.';
          console.error('Error getting cinemas:');
          this.loading = false;
        }
      });
    }
  }

}
