import { Component, OnInit } from '@angular/core';
import { TheaterByCinemaService } from '../theaters-by-cinema/theater-by-cinema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cinema, Theater } from '../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-theater-edit',
  templateUrl: './theater-edit.component.html',
  styleUrls: ['./theater-edit.component.css']
})
export class TheaterEditComponent implements OnInit{
  editMode :boolean = true
  theaterForm : FormGroup = new FormGroup({
    max_seats: new FormControl('', [Validators.required, Validators.min(1)])
  })
  cinema : Cinema = {
    id:0,
    address:"",
    movies: [],
    name: "",
    theaters: []
  }
  errorMessage: null | string = null;
  theaterId : null | number = null;
  theater: Theater = {
    id:0,
    cinema: 0,
    numChairs: 0
  }

  constructor(
    private service : TheaterByCinemaService,
    private route : ActivatedRoute,
    private router: Router
  ){}
  
  ngOnInit() {
    this.cinema.id = this.route.snapshot.params["cid"];
    this.theaterId = this.route.snapshot.params["tid"];
    if (!this.theaterId){
      this.editMode = false
    }else{
      this.editMode = true
    }
    this.loadCinema();
  }

  loadCinema() {
    if (this.cinema.id !== null) {
      this.service.getCinema(this.cinema.id).subscribe({
        next: (response) => {
          this.cinema = response.data;
          this.errorMessage = null;
          if (this.editMode) {
            this.loadTheater();
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred while fetching cinema.';
          console.error('Error getting cinema:');
          this.router.navigate(["/manager-home/theaters"]);
        }
      });
    }
  }

  loadTheater() {
    if (this.theaterId) {
      let isValid = this.validate()
      if (!isValid) {
            this.errorMessage = "Url with incorrect data";
            console.log(this.errorMessage);
            this.router.navigate(["/manager-home/theaters"]);
      }else{
        this.service.getTheater(this.theaterId).subscribe({
          next: (response) => {
            this.theater = response.data;
            this.errorMessage = null;
            this.theaterForm.setValue({
              max_seats: this.theater.numChairs
            });
          },
          error: () => {
            this.errorMessage = 'An error occurred while fetching the theater.';
            console.error('Error getting theater:');
          }
        });
      }
    }
  }

  validate() {
    return this.cinema.theaters.some(t => t.id == this.theaterId);
  }

  deleteTheater(){
    if(this.theaterId){
      this.service.deleteTheater(this.theaterId).subscribe({
        next: ()=>{
          this.errorMessage = null;
          this.router.navigate(["/manager-home/theaters/", this.cinema.id]);
        }, error: ()=> {
          this.errorMessage = 'An error occurred while deleting the theater.'
          console.error('Error deleting theater:');
        }
      });
    }
  }

  submit(){
    this.theater.numChairs = this.theaterForm.get("max_seats")?.value;
    if(this.editMode){
      if(this.theaterId){
        this.service.updateTheater(this.theaterId, this.theater).subscribe({
          next: () => {
              this.errorMessage = null;
              this.router.navigate(['/manager-home/theaters/',this.cinema.id]);
          },
          error: () => {
            this.errorMessage = 'An error occurred while updating the theater.'
            console.error('Error updating theater:');
          }
        });
      }
    }else{
        this.theater.cinema = this.cinema.id;
        this.service.addTheater(this.theater).subscribe({
          next: () => {
              this.errorMessage = null;
              this.router.navigate(['/manager-home/theaters/',this.cinema.id]);
          },
          error: () => {
            this.errorMessage = 'An error occurred while creating the theater.'
            console.error('Error creating theater:');
          }
        });
      }
  }
}
