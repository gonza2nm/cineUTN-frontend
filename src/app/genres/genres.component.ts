import { Component, OnInit } from '@angular/core';
import { Genre } from '../interfaces/interfaces';
import { GenresService } from './genres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit{
  genres: Genre [] = [];
  errorMessage : string | null = null;
  loading : string | null = null;

  constructor(
    private service : GenresService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.loadGenres()
  }

  loadGenres(){
    this.service.getGenres().subscribe({
      next: (response) => {
        this.genres = response.data;
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'An error occurred while fetching genre.';
        console.error('Error getting genre:');
        this.router.navigate(['/manager-home']);
      },
    });
  }

}
