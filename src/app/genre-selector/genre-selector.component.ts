import { Component } from '@angular/core';

@Component({
  selector: 'app-genre-selector',
  templateUrl: './genre-selector.component.html',
  styleUrls: ['./genre-selector.component.css'],
})
export class GenreSelectorComponent {
  genres: string[] = ['Acción', 'Comedia', 'Drama', 'Fantasía', 'Terror'];
  selectedGenre: string | null = null;
  dropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectGenre(genre: string): void {
    this.selectedGenre = genre;
    this.dropdownOpen = false;
  }
}
