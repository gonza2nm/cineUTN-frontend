import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User, Buy } from '../interfaces/interfaces';
import { MyAccountService } from './my-account.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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


  ngOnInit() {
    this.user = this.loginService.getOneUser();
    this.buys = this.user.buys;

    this.userEditForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      surname: new FormControl(this.user.surname, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      //phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
      dni: new FormControl(this.user.dni, [Validators.required]),
      type: new FormControl('user')
    });
  }


  changeOption(opt: string) {
    this.option = opt
  }


  showDetails(buy: Buy) {
    this.myAccountservice.setPurchase(buy);
    this.router.navigate(['buy-details']);
  }


  //--------------------------------------------------------------------


  updateUser() {
    //this.isSubmmited = true;
    this.loginService.updateUser(this.user.id, this.userEditForm.value).subscribe({
      next: (response) => {
        this.messageError = '¡Se ha registrado exitosamente!';
        console.log(response);
        //this.registerForm.reset();
      }, 
      error: (error) => {
        this.messageError = 'Ocurrio un error, por favor intente mas tarde.';
        console.log(error);
      }
    })
    
  }




}
