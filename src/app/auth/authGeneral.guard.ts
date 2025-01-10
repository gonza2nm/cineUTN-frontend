import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const AuthGeneralGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isLoggedIn.pipe(
    map((isLoggedIn) => {
      const user = authService.getUser();
      if (isLoggedIn) {
        if(user?.type === "manager" || user?.type === "user"){
          return true; 
        }else{
          router.navigate(["/"])
          return false;
        }
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};