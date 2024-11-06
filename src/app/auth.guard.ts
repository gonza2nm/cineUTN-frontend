import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyectar el servicio
  const router = inject(Router);
  return authService.isLoggedIn.pipe(
    map((isLoggedIn) => {
      const user = authService.getUser();
      if (isLoggedIn) {
        if(user?.type === "manager"){
          return true; 
        }else{
          router.navigate(["/"])
          return false;
        }
      } else {
        router.navigate(['/login']);
        console.log("no pase")
        return false;
      }
    })
  );
};