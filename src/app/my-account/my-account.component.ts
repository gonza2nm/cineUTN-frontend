import { Component, OnInit } from '@angular/core';
import { User, Buy, Ticket } from '../interfaces/interfaces';
import { MyAccountService } from './my-account.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(private authService: AuthService, private mservice: MyAccountService) {}
  user: User | null = null;
  buys: Buy[] | undefined;
  message = '';

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.buys = this.user?.buys;
    //deberiamos hacer una peticion cada vez que se inicia para conseguir las nuevas compras
  }

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

}
