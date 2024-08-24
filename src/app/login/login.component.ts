import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private service: LoginService) {}

  onSubmit() {
    console.log(this.loginForm.value);
  }

  loadOneUser() {
    this.service.getUser(1).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });
}
