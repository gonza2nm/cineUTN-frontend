import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
    this.authService.checkLoginStatus();
    if (this.isLoggedIn) {
      this.router.navigate(["/"])
    }
  }

  messageError: string = '';
  credentialsError: boolean = false;
  othersError: boolean = false;


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  getUser(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (success) => {
        if (success) {
          if (this.authService.getUser()?.type == "manager") {
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
