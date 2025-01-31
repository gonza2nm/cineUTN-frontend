import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cinema, User } from '../interfaces/interfaces';
import { CinemaService } from '../cinemas/cinema.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isUserModeEdit: boolean = false;
  isManagerMode: boolean = false;
  isManagerModeEdit: boolean = false;
  userId: number | null = null;
  userData: User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    dni: '',
    type: 'user',
    cinema: {
      id: 0,
      name: '',
      address: '',
      theaters: [],
      movies: []
    },
    buys: []
  }


  band = true;
  messageError: string | null = null;

  //para encontrar el id de cine actual y para mostrar todos los que se pueden selecionar
  managerCinemaId: number | null = null;
  allCinemas: Cinema[] = []

  registerForm: FormGroup;
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private cinemaService: CinemaService
  ) {

    //se inicializa dentro del constructor, para que este configurado y disponible para usarse
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      type: new FormControl('user')
    });
  }


  ngOnInit(): void {
    //recupero el id de la ruta actual
    this.userId = this.route.snapshot.params['id']
    //me fijo si estoy entrando desde manager-home
    this.route.url.subscribe(urlSegments => {
      if ('manager-home' === urlSegments[0]?.path) {
        this.registerForm.get('type')?.setValue('manager');//le pongo manager al form
        this.isManagerMode = true; //activo managerMode
        if (this.userId) { //si estamos en manager-home y en modo edicion
          this.isManagerModeEdit = true;
          this.loadOneManager();
        } else { //si no es edit mode
          this.loadAllCinemas();
        }
      }
    });
  }

  //Registra un usuario en la base de datos
  addUser() {
    this.loginService.addUser(this.registerForm.value).subscribe({
      next: (response) => {
        this.messageError = null;
        this.router.navigate(['/login'])
      },
      error: (error) => {
        this.band = false;
        this.messageError = 'Ocurrio un error, por favor intente mas tarde.';
        console.error(error.error);
      }
    })
  }

  loadOneManager() {
    if (this.userId) { //sin este if no deja entrar al metodo porque dice que puede ser null
      this.loginService.getOneManager(this.userId).subscribe({
        next: (response) => {
          this.userData = response.data
          this.messageError = null;
          //Pongo los datos del cinema en el form
          this.registerForm.setValue({
            name: this.userData.name,
            surname: this.userData.surname,
            email: this.userData.email,
            password: this.userData.password,
            dni: this.userData.dni,
            type: this.userData.type,
          });
          this.managerCinemaId = this.userData.cinema?.id || null;
          this.loadAllCinemas();
        },
        error: (err) => {
          this.messageError = 'An error occurred while fetching the cinema.'
          console.error('Error getting manager:', err.error.error);
          this.router.navigate(['/manager-home/managers']); // por si se quiere meter a un id que no existe
        }
      });
    }
  }

  loadAllCinemas() {
    this.cinemaService.getAllCinemas().subscribe({
      next: (response) => {
        this.allCinemas = response.data;
      },
      error: (err) => {
        console.error('Error getting all cinemas', err.error.message)
      }
    })
  }

  saveManager() {
    //Guardo los datos ingresados del form en el userData
    this.userData.name = this.registerForm.get('name')?.value; //busca en el formGroup el formControl que se llame 'name' y con .value le agarra el valor.
    this.userData.surname = this.registerForm.get('surname')?.value;
    this.userData.email = this.registerForm.get('email')?.value;
    this.userData.password = this.registerForm.get('password')?.value;
    this.userData.dni = this.registerForm.get('dni')?.value;
    this.userData.type = this.registerForm.get('type')?.value;

    this.userData.cinema = { id: this.managerCinemaId || 0, name: '', address: '', theaters: [], movies: [] }

    if (this.isManagerModeEdit) {
      if (this.userId) { //sin este if no deja entrar al metodo porque dice que puede ser null
        this.loginService.updateUser(this.userId, this.userData).subscribe({
          next: () => {
            this.messageError = null; //borra el mensaje de error por si viene alguno viejo arrastrado
            this.router.navigate(['/manager-home/managers'])
          },
          error: (err) => {
            this.messageError = 'An error occurred while updating the manager.'
            console.error('Error updating manager:', err.error.error);
          }
        });
      }
    } else { //o sea si no esta en editMode entra al add
      this.loginService.addUser(this.userData).subscribe({
        next: () => {
          this.messageError = null;
          this.router.navigate(['/manager-home/managers'])
        },
        error: (err) => {
          this.messageError = 'An error occurred while saving the manager.'
          console.error('Error saving manager:', err.error.error);
        }
      })
    }
  }

  deleteManager() {
    if (this.userId) {
      this.loginService.deleteUser(this.userId).subscribe({
        next: () => {
          this.messageError = null;
          this.router.navigate(['/manager-home/managers'])
        },
        error: () => {
          this.messageError = 'An error occurred while deleting the manager.'
          console.error('Error deleting manager:');
        }
      })
    }
  }

  selectCinema(cinemaId: number) {
    this.managerCinemaId = cinemaId;
  }
}
