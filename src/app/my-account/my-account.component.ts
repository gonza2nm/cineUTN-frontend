import { Component, OnInit } from '@angular/core';
import { MyAccountService } from './my-account.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { User } from '../interfaces/user.interface.js';
import { Buy } from '../interfaces/buy.interface.js';

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
      this.loadBuys(this.user.id);
    }

    this.userEditForm = new FormGroup({
      name: new FormControl(this.user?.name, [Validators.required]),
      surname: new FormControl(this.user?.surname, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required]),
      password: new FormControl(''),
      dni: new FormControl(this.user?.dni, [Validators.required]),
      type: new FormControl(this.user?.type)
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
      next: () => {
        this.band = true;
        this.messageError = '¡Los cambios se guardaron correctamente!';
      },
      error: (error) => {
        this.messageError = 'Ocurrio un error, por favor intente mas tarde.';
        console.error(error);
      }
    })

  }

  deleteUser() {
    this.loginService.deleteUser(this.user?.id).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.error(err)
      }
    })
  }


  loadBuys(id: number): void {
    this.myAccountservice.getBuyByUser(id).subscribe({
      next: (response) => {
        this.errorMessage = null;

        //ordena las compras por estado
        this.buys = response.data.sort((a: any, b: any) => {
          const stateOrder = ['Válida', 'Expirada', 'Cancelada'];
          const stateComparison = stateOrder.indexOf(a.status) - stateOrder.indexOf(b.status);
          return stateComparison
        })
      },

      error: () => {
        this.errorMessage = 'Ocurrio un error al buscar las compras.';
        console.error('Ocurrio un error al buscar las compras.');
      },
    });
  }

  formatDateAndHour(date: Date) {
    const fecha = new Date(date);
    const year = fecha.getFullYear();
    const diaMes = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let hour = fecha.getHours().toString().padStart(2, '0');
    let minutes = fecha.getMinutes().toString().padStart(2, '0');
    return `${diaMes}/${mes}/${year} - ${hour}:${minutes} hs`;
  }



}
