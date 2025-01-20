import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const AuthGeneralGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
   if(authService.isUser() || authService.isManager()){
    return true;
   }else{
    return authService.checkCookieAndPermissions(null);
   }
};