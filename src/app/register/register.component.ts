import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/interfaces.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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
  //isSubmmited:boolean = false;
  registerForm: FormGroup;
  constructor(
    private service: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    //se inicializa dentro del constructor, para que este configurado y disponible para usarse
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      //phoneNumber: new FormControl('', [Validators.required]),
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
        }
      }
    });
  }

  //Registra un usuario en la base de datos
  addUser() {
    //this.isSubmmited = true;
    this.service.addUser(this.registerForm.value).subscribe({
      next: (response) => {
        this.messageError = '¡Se ha registrado exitosamente!';
        console.log(response);
        //this.registerForm.reset();
      },
      error: (error) => {
        this.band = false;
        this.messageError = 'Ocurrio un error, por favor intente mas tarde.';
        console.log(error);
      }
    })
  }

  loadOneManager() {
    if (this.userId) { //sin este if no deja entrar al metodo porque dice que puede ser null
      this.service.getOneManager(this.userId).subscribe({
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
        },
        error: (err) => {
          this.messageError = 'An error occurred while fetching the cinema.'
          console.error('Error getting manager:', err.error.error);
          this.router.navigate(['/manager-home/managers']); // por si se quiere meter a un id que no existe
        }
      });
    }
  }

  deleteManager() {

  }




}
