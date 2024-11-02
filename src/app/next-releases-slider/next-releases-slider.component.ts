import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movies/movie.service';
import { Movie } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-releases-slider',
  templateUrl: './next-releases-slider.component.html',
  styleUrls: ['./next-releases-slider.component.css']
})
export class NextReleasesSliderComponent implements OnInit {

  nextReleases: Movie[] = [];
  currentRelease: Movie | null = null; //typescript obliga a que sea inicializado con un valor. Por eso le pongo el tipo nulo y lo pongo en nulo
  currentReleaseIndex: number = 0;
  errorMessage: string | null = null;
  loading: boolean = true //para no mostrar error antes de que carge la pagina

  constructor(
    private movieService: MovieService,
    private router: Router) { }


  ngOnInit(): void {
    this.loadNextReleases();
  }

  //BORAR TODOS LOS COMENTARIOS QUE NO USO, QUEDARON VIEJOS
  loadNextReleases() {
    this.movieService.getNextReleases().subscribe({
      next: (response) => {
        this.nextReleases = response.data;
        if (this.nextReleases.length > 0) {
          this.currentRelease = this.nextReleases[0];
        }
        this.errorMessage = null;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while fetching next realeases.';
        console.error('Error getting next realeases:', err.error.message);
        this.loading = false;
      }
    });
  }

  nextMovie() {
    if (this.currentReleaseIndex < this.nextReleases.length - 1) { // si es menor que el limite muestra la proxima
      this.currentReleaseIndex++;
    } else { // si esta en el limite lo devuelvo al primero
      this.currentReleaseIndex = 0;
    }
    this.currentRelease = this.nextReleases[this.currentReleaseIndex];
  }

  prevMovie() {
    if (this.currentReleaseIndex > 0) { //si todavia no llego al limite del arreglo sigue banjando.
      this.currentReleaseIndex--;
    } else { //si llego al limite va la vuelta al limite superior.
      this.currentReleaseIndex = this.nextReleases.length - 1;
    }
    this.currentRelease = this.nextReleases[this.currentReleaseIndex];
  }

  navigateToMovie(movie: Movie): void {
    this.router.navigate(['/movies', movie.id]);
  }
}
