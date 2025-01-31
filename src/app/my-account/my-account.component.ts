import { Component, OnInit } from '@angular/core';
import { User, Buy, Ticket } from '../interfaces/interfaces';
import { MyAccountService } from './my-account.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private myAccountservice: MyAccountService,
    private router: Router
  ) { }

  user: User | null = null;
  buys: Buy[] | undefined;
  message = '';

  option = 'compras';
  showDetails$ = false;
  userEditForm!: FormGroup;
  messageError = '';
  errorMessage: string | null = null
  band: boolean = false;

  ngOnInit(): void {
    
    this.authService.user.subscribe(user => {
      this.user = user;
    });
    if (this.user !== null) {
      console.log(this.user.id);
      this.loadBuys(this.user.id); // Cargar las compras si el usuario está disponible
    }

    this.userEditForm = new FormGroup({
      name: new FormControl(this.user?.name, [Validators.required]),
      surname: new FormControl(this.user?.surname, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required]),
      password: new FormControl(this.user?.password, [Validators.required]),
      dni: new FormControl(this.user?.dni, [Validators.required]),
      type: new FormControl('user')
    });

  }

  changeOption(opt: string) {
    this.option = opt;
    this.messageError = "";
  }


  showDetails(buy: Buy) {
    this.router.navigate([`buy-details/${buy.id}`]);
  }

  updateUser() {
    this.loginService.updateUser(this.user?.id, this.userEditForm.value).subscribe({
      next: (response) => {
        this.band = true;
        this.messageError = '¡Los cambios se guardaron correctamente!';
        console.log(response);
      },
      error: (error) => {
        this.messageError = 'Ocurrio un error, por favor intente mas tarde.';
        console.log(error);
      }
    })

  }

  deleteUser() {
    this.loginService.deleteUser(this.user?.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.log(err)
      }
    })
  }


  loadBuys(id: number): void {
    this.myAccountservice.getBuyByUser(id).subscribe({
      next: (response) => {
        console.log(response.data);
        this.buys = response.data;
        this.errorMessage = null;
      },

      error: () => {
        this.errorMessage = 'Ocurrio un error al buscar las compras.';
        console.error('Ocurrio un error al buscar las compras.');
      },
    });
  }



}
