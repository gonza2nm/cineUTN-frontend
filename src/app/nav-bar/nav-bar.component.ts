import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  isManager = this.authService.getUser()?.type == "manager" ? true : false;
  isMenuOpen = false;
  isLoggedIn: boolean = false;

  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((status: boolean) => {
      this.isLoggedIn = status; 
    });
    this.authService.checkLoginStatus();
  }

  logout(){
    this.authService.logout();
  }
}
