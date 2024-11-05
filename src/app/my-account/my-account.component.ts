import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User, Buy } from '../interfaces/interfaces';
import { MyAccountService } from './my-account.service';
import { Router } from '@angular/router';


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


  ngOnInit() {
    this.user = this.loginService.getOneUser();
    this.buys = this.user.buys;
  }


  changeOption(opt: string) {
    this.option = opt
  }


  showDetails(buy: Buy) {
    this.myAccountservice.setPurchase(buy);
    this.router.navigate(['buy-details']);
  }


  
  
  

  // ---------------- Ejemplo -----------------------------------------

  /*
  loadGenres(){
    this.service.getGenres().subscribe({
      next: (response) => {
        this.genres = response.data;
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'An error occurred while fetching genre.';
        console.error('Error getting genre:');
        this.router.navigate(['/manager-home']);
      },
    });
  }
  */







  //--------------------------------------------------------------------




}
