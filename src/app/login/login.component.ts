import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(
    private loginService: LoginService, 
    private authService: AuthService,
    private router: Router
  ) {}

  messageError:string = '';
  credentialsError:boolean = false;
  othersError:boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  getUser(): void {
    this.loginService.getUser(this.loginForm.value).subscribe({
      next: (response) => {
        this.loginService.setUser(response.data); //Le pasa el valor al service y el service se lo pasa al my-account.
        this.authService.login(); //Cambia el estado a logueado.
        this.router.navigate(['/my-account']);
        console.log(response);
      },

      error: (error) => {
        if (error.status === 404) {
          this.credentialsError = true;
          this.messageError = 'Email y/o contraseña incorrectos.';
        } else {
          this.othersError = true;
          this.messageError = 'Ocurrio un error, por favor intente mas tarde.';     
        }
        console.log(error);
      }
    })
  }
}
