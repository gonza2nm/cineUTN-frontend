import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  isManager: boolean = false;
  isMenuOpen = false;
  isLoggedIn: boolean = false;

  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
    });
    this.authService.isManager().subscribe(isManager =>{ 
      this.isManager = isManager;
    });
  }

  logout() {
    this.authService.logout().subscribe(success => {
      if(success){
        this.router.navigate(["/login"]);
      }else{
      }
    });
  }
}
