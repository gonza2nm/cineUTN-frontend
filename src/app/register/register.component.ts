import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private service: LoginService) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    //phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    type: new FormControl('user')
  });


  band = true;
  messageError:string = '';
  //isSubmmited:boolean = false;


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

  


}
