import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard:(permisosNecesarios: "manager" | "user") => CanActivateFn = (permisosNecesarios: "manager" | "user") => 
  (route,state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    let isLoggedIn, isManager;
    authService.isLoggedIn().subscribe(isLoggedInf => {
      isLoggedIn = isLoggedInf;
    });
    authService.isManager().subscribe(isManag => {
      isManager = isManag;
    })
    if(isLoggedIn){
      if(state.url === "/login"){
        console.log("esta logeado y entro al login")
        router.navigate(["/"]);
        return false;
      }
      if(permisosNecesarios === "manager" && isManager){
        console.log("esta logeado y la ruta necesita tener permisos de manager y los cumple")
        return true
      }else if(permisosNecesarios === "user"){
        console.log("esta logeado y la ruta necesita tener permisos de usuario y los cumple")
        return true;
      }else{
        console.log("No cumplio con las demas condiciones y se redirecciona a la pagina principal")
        router.navigate(["/"]);
        return false;      
      }
    }else{
      console.log("No esta logeado y lo deja entrar al login")
      return true;
    }
};