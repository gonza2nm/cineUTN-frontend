import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User, Buy } from '../interfaces/interfaces';
import { MyAccountService } from './my-account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tick } from '@angular/core/testing/index.js';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})


export class MyAccountComponent implements OnInit {

  constructor(
    private loginService: LoginService, 
    private myAccountservice: MyAccountService,
    private router: Router
  ) {}
  

  user!: User;
  buys: Buy[] = [];
  option = 'compras';
  showDetails$ = false;
  userEditForm!: FormGroup;
  messageError = '';
  band: boolean = false;


  ngOnInit() {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    //this.user = this.loginService.getOneUser();
    if (this.user) {
      this.buys = this.user.buys;
    }

    
    this.userEditForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      surname: new FormControl(this.user.surname, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
      dni: new FormControl(this.user.dni, [Validators.required]),
      type: new FormControl('user')
    });
    
  }


  changeOption(opt: string) {
    this.option = opt;
    this.messageError = "";
  }


  showDetails(buy: Buy) {
    this.myAccountservice.setPurchase(buy);
    this.router.navigate(['buy-details']);
  }


  //--------------------------------------------------------------------


  updateUser() {
    this.loginService.updateUser(this.user.id, this.userEditForm.value).subscribe({
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
    this.loginService.deleteUser(this.user.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.log(err)
      }
    })
  }




}
