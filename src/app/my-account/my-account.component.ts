import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { User, Buy, Ticket } from '../interfaces/interfaces';
import { MyAccountService } from './my-account.service';
import { MovieDetailsService } from '../movie-details/movie-details.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {

  constructor(private loginService: LoginService, private mservice: MyAccountService) {}

  option = 'compras'
  //detaildBuy = false;


  changeOption(opt: string) {
    this.option = opt
  }

  /*
  details(opt:boolean) {
    this.detaildBuy = opt;
  }
  */

  
  user: User = this.loginService.getOneUser();
  buys: Buy[] = this.user.buys;
  message = '';

}
