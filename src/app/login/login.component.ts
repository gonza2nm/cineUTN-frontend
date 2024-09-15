import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private service: LoginService) {}

  band = true;
  messageError:string = '';

  onSubmit() {
    console.log(this.loginForm.value);
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });

  getUser(): void {
    this.service.getUser(1).subscribe({
      next: (response) => {
        console.log("aca", response);
      },

      error: (error) => {
        this.messageError = 'Ocurrio un error, por favor intente mas tarde.';
        console.error('Ocurrio un error.');
      }
    })
  }
}
