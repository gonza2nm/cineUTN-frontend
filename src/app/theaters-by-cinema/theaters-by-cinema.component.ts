import { Component, OnInit } from '@angular/core';
import { TheaterByCinemaService } from './theater-by-cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from '../interfaces/theater.interface.js';

@Component({
  selector: 'app-theaters-by-cinema',
  templateUrl: './theaters-by-cinema.component.html',
  styleUrls: ['./theaters-by-cinema.component.css']
})
export class TheatersByCinemaComponent implements OnInit {
  theaters: Theater[] = [];
  errorMessage: string | null = null;
  loading: boolean = true;
  cinemaId: number | null = null;


  constructor(
    private service: TheaterByCinemaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cinemaId = this.route.snapshot.params['cid'];
    this.loadTheaters();
  }

  loadTheaters() {
    if (this.cinemaId !== null) {
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
          this.router.navigate(["/manager-home/theaters"]);
        }
      });
    } else {
      this.router.navigate(["/manager-home/theaters"]);
    }
  }

}
