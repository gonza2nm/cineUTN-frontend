import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemaService } from '../cinemas/cinema.service';
import { Cinema } from '../interfaces/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cinema-edit',
  templateUrl: './cinema-edit.component.html',
  styleUrls: ['./cinema-edit.component.css']
})
export class CinemaEditComponent implements OnInit {

  cinemaId: number | null = null;
  isEditMode: boolean = false;
  errorMessage: string | null = null;
  cinemaForm: FormGroup;
  cinemaData: Cinema = {
    id: 0,
    name: '',
    address: '',
    theaters: [],
    movies: [],
  }

  constructor(
    private route: ActivatedRoute, // Se usa para acceder a informacion de la ruta activa , en este caso para acceder al parametro id
    private cinemaService: CinemaService,
    private router: Router //permite redirigir a una página diferente despues de que se haya completado alguna acción. (Ej: luego de crear el cine lo mando a la lista de cine)
  ) {
    //se inicializa dentro del constructor, para que este configurado y disponible para usarse
    this.cinemaForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    //recupero el id de la ruta actual
    this.cinemaId = this.route.snapshot.params['id']

    if (this.cinemaId) {
      this.isEditMode = true;
      this.loadOneCinema();
    }
  }

  loadOneCinema() {
    if (this.cinemaId) {
      this.cinemaService.getOneCinema(this.cinemaId).subscribe(
        (response) => {
          if ('data' in response) {
            this.cinemaData = response.data
            this.errorMessage = null;
            //Pongo los datos del cinema en el form
            this.cinemaForm.setValue({
              name: this.cinemaData.name,
              address: this.cinemaData.address
            });
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred while fetching the cinema.'
          console.error('Error getting cinemas:', error);
        }
      );
    }
  }

  onSubmit() { //cambiar esto a un saveCinema()
    console.log(this.cinemaForm.value);
  }

}