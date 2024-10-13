import { Component, OnInit } from '@angular/core';
import { TheaterByCinemaService } from '../theaters-by-cinema/theater-by-cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from '../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-theater-edit',
  templateUrl: './theater-edit.component.html',
  styleUrls: ['./theater-edit.component.css']
})
export class TheaterEditComponent implements OnInit{
  editMode :boolean = true
  theaterForm : FormGroup;
  cinemaId: number;
  errorMessage: null | string = null;
  theaterId : null | number;
  theater: Theater = {
    id:0,
    cinema: 0,
    numChairs: 0
  }

  constructor(
    private service : TheaterByCinemaService,
    private route : ActivatedRoute,
    private router: Router
  ){
    this.theaterForm = new FormGroup({
      max_seats: new FormControl('', [Validators.required, Validators.min(1)])
    })
    this.cinemaId = this.route.snapshot.params["cid"];
    this.theaterId = this.route.snapshot.params["tid"];
    if (!this.theaterId){
      this.editMode = false
    }else{
      this.editMode = true
    }
  }
  
  ngOnInit(): void {
    this.loadCinema();
    if(this.editMode){
      this.loadTheater()
    }
  }
  editmode: boolean = true;

  loadTheater(){
    if(this.theaterId){
      this.service.getTheater(this.theaterId).subscribe({
        next: (response) => {
          this.theater = response.data;
          this.errorMessage = null;
          this.theaterForm.setValue({
            max_seats: this.theater.numChairs
          });
        },error: ()=>{
          this.errorMessage = 'An error occurred while fetching the theater.'
          console.error('Error getting theater:');
        }
      });
    }
  }

  loadCinema(){
    if(this.cinemaId !== null){
      this.service.getCinema(this.cinemaId).subscribe({
        next: (response) => {
        },
        error: () => {  
          this.errorMessage = 'An error occurred while fetching cinema.';
          console.error('Error getting cinema:');
          this.router.navigate(["/manager-home/theaters"]);
        }
      });
    }else{
      this.router.navigate(["/manager-home/theaters"]);
    }
  }

  submit(){
    this.theater.numChairs = this.theaterForm.get("max_seats")?.value;
    if(this.editMode){
      if(this.theaterId){
        this.service.updateTheater(this.theaterId, this.theater).subscribe({
          next: () => {
              this.errorMessage = null;
              this.router.navigate(['/manager-home/theaters/',this.cinemaId]);
          },
          error: () => {
            this.errorMessage = 'An error occurred while updating the theater.'
            console.error('Error updating theater:');
          }
        });
      }
    }else{
        this.theater.cinema = this.cinemaId;
        this.service.addTheater(this.theater).subscribe({
          next: () => {
              this.errorMessage = null;
              this.router.navigate(['/manager-home/theaters/',this.cinemaId]);
          },
          error: () => {
            this.errorMessage = 'An error occurred while updating the theater.'
            console.error('Error updating theater:');
          }
        });
      }
  }
}

//falta verificar que la sala exista en ese cine
