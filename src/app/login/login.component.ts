import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private service: LoginService, private router: Router
  ) {}

  band = true;
  messageError:string = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(''),
  });


  getUser(): void {
    const {email, password} = this.loginForm.value
    this.service.getUser(email, password).subscribe({
      next: (response) => {
        this.service.setUser(response.data); //Le pasa el valor al service y el service se lo pasa al my-account.
        this.router.navigate(['/my-account']);
        console.log(response);
      },

      error: (error) => {
        this.band = false
        this.messageError = 'Ocurrio un error, por favor intente mas tarde.';
        console.error('Ocurrio un error.');
      }
    })
  }

}
