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


}
