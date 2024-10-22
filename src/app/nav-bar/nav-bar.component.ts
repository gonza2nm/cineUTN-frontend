import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent implements OnInit {

  constructor(private service: LoginService, private router: Router, private route: ActivatedRoute) {}

  isMenuOpen = false;
  isAuth = false;


  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  ngOnInit(): void {
    // Verifica el estado de autenticación
    this.service.isAuthenticated$.subscribe(
      (authStatus) => {this.isAuth = authStatus}
    );
  }

  logout(){
    this.service.logout();
  }



}
