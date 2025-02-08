import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

//-----------

import { of } from 'rxjs';
import { AuthService } from './auth.service';


// Original -------------------------------------------------------------------------------------
/*
describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

*/

// Mock del AuthService
class MockAuthService {
  checkTokenFindData() {
    return of(true); // Simulando que siempre pasa la validación
  }
  isLoggedIn() {
    return of(true); // Simulando que siempre está logueado
  }
  isManager() {
    return of(false); // Simulando que no es un manager
  }
}

describe('authGuard', () => {
  let router: Router;

  // Función que ejecuta el guard en el contexto de la prueba
  const executeGuard = (permisosNecesarios: "manager" | "user") => 
    AuthGuard(permisosNecesarios);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
      ]
    });
    router = TestBed.inject(Router); // Inyectamos el router
  });

  it('should be created', () => {
    const guard = executeGuard('user');
    expect(guard).toBeTruthy();
  });

});