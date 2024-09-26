import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-next-releases-slider',
  templateUrl: './next-releases-slider.component.html',
  styleUrls: ['./next-releases-slider.component.css']
})
export class NextReleasesSliderComponent implements OnInit {

  nextReleases: Movie[] = [];

  constructor(
    private movieService: MovieService) { }


  ngOnInit(): void {
    this.loadNextReleases();
  }

  //carga los proximos estrenos (no terminado hasta que meca me responda lo anterior, voy a darle estilo usando un getallmovies como para avanzar con algo)
  loadNextReleases() {
    this.movieService.getMovies().subscribe({
      next: (response) => {
        this.nextReleases = response.data;
        // this.errorMessage = null; no hay errorMessage aca pero podria ser una buena idea agregarlo
        // this.loading = false; por si metemos errores que no aparesca antes de que cargue.
      },
      error: () => {
        //this.errorMessage = 'An error occurred while fetching next realeases.';
        console.error('Error getting next realeases:');
        //this.loading = false;
      }
    });
  }

}
