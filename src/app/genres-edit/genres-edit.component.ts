import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from '../interfaces/interfaces';
import { GenresService } from '../genres/genres.service';

@Component({
  selector: 'app-genres-edit',
  templateUrl: './genres-edit.component.html',
  styleUrls: ['./genres-edit.component.css']
})
export class GenresEditComponent implements OnInit{
  editMode: boolean = false
  errorMessage: string | null = null;
  genreForm!: FormGroup;
  genreId : number | null = null;
  genre : Genre = {
    id: 0,
    name: ""
  }

  constructor(
    private service : GenresService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.genreId = this.route.snapshot.params['gid'];
    this.genreForm = new FormGroup(
    {
      genre: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
    if (!this.genreId) {
      this.editMode = false;
    } else {
      this.editMode = true;
      this.loadGenre();
    }
  }

  loadGenre(){
    if(this.genreId){
      this.service.getOneGenre(this.genreId).subscribe({
        next: (response) => {
          this.genre = response.data;
          this.genreForm.setValue({
            genre : this.genre.name
          })
          this.errorMessage = null;
        },
        error: () => {
          this.errorMessage = 'An error occurred while fetching genre.';
          console.error('Error getting genre:');
          this.router.navigate(['/manager-home/genres']);
        },
      });
    }
  }

  submit(){
    this.genre.name = this.genreForm.get('genre')?.value;
    if (this.editMode) {
      if (this.genreId != null) {
        this.service.updateGenre(this.genreId, this.genre).subscribe({
          next: () => {
            this.errorMessage = null;
            this.router.navigate(['/manager-home/genres']);
          },
          error: () => {
            this.errorMessage =
              'An error occurred while updating the genre.';
            console.error('Error updating genre:');
          },
        });
      }
    } else {
      this.service.addGenre(this.genre).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/genres']);
        },
        error: () => {
          this.errorMessage = 'An error occurred while creating the genre.';
          console.error('Error creating genre:');
        },
      });
    }
  }

  deleteGenre(){
    if (this.genreId) {
      this.service.deleteGenre(this.genreId).subscribe({
        next: () => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/genres']);
        },
        error: () => {
          this.errorMessage = 'An error occurred while deleting the genre.';
          console.error('Error deleting genre:');
        },
      });
    }
  }

}
