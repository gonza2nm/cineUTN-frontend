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
  currentRelease: Movie | null = null; //typescript obliga a que sea inicializado con un valor. Por eso le pongo el tipo nulo y lo pongo en nulo
  currentReleaseIndex: number = 0;

  constructor(
    private movieService: MovieService) { }


  ngOnInit(): void {
    this.loadNextReleases();
  }

  //BORAR TODOS LOS COMENTARIOS QUE NO USO, QUEDARON VIEJOS
  //carga los proximos estrenos (no terminado hasta que meca me responda lo anterior, voy a darle estilo usando un getallmovies como para avanzar con algo)
  loadNextReleases() {
    this.movieService.getNextReleases().subscribe({
      next: (response) => {
        this.nextReleases = response.data;
        if (this.nextReleases.length > 0) {
          this.currentRelease = this.nextReleases[0];
        }
        // this.errorMessage = null; no hay errorMessage aca pero podria ser una buena idea agregarlo
        // this.loading = false; por si metemos errores que no aparesca antes de que cargue.
      },
      error: (err) => {
        //this.errorMessage = 'An error occurred while fetching next realeases.';
        console.error('Error getting next realeases:', err.error);
        //this.loading = false;
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


}
