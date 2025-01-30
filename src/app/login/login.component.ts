import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent{

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }


  messageError: string = '';
  credentialsError: boolean = false;
  othersError: boolean = false;


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (success) => {
        if (success) {
          if (this.authService.isManager()) {
            this.router.navigate(["/manager-home"]);
          } else {
            this.router.navigate(['/my-account']);
          }
        } else {
          this.credentialsError = true;
          this.messageError = 'Email y/o contraseña incorrectos.';
        }
      },
      error: () => {
        this.othersError = true;
        this.messageError = 'Error al realizar el login. Intenta de nuevo.';
      }
    })
  }
}
