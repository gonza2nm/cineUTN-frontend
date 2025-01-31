import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

export const AuthGuard: (permisosNecesarios: "manager" | "user") => CanActivateFn = (permisosNecesarios: "manager" | "user") => 
  (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkTokenFindData().pipe(
      switchMap(() => authService.isLoggedIn()),
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return authService.isManager().pipe(
            map(isManager => {
              if (state.url === "/login") {
                router.navigate(["/"]);
                return false;
              }

              if (permisosNecesarios === "manager" && isManager) {
                return true;
              } else if (permisosNecesarios === "user") {
                return true;
              } else {
                router.navigate(["/"]);
                return false;
              }
            })
          );
        } else {
          if (state.url === "/login") {
            return of(true);
          } else {
            router.navigate(["/login"]);
            return of(false);
          }
        }
      }),
      catchError(() => {
        router.navigate(["/login"]);
        return of(false);
      })
    );
  };