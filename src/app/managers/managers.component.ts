import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from '../interfaces/user.interface.js';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
})
export class ManagersComponent implements OnInit {

  managers: User[] = []; //array vacio de tipo User[]
  errorMessage: string | null = null; //una variable que puede tener un msj de error o null
  loading: boolean = true //Sirve para que no se muestren los mensajes de error mientras todavia esta cargando el loadManagers

  //recibe una instancia de LoginService
  constructor(private loginService: LoginService) { }

  //cuando el componente es inicializado se ejecuta
  ngOnInit(): void {
    this.loadManagers();
  }

  //realiza la solitud al servicio para obtener los datos de los managers
  loadManagers() {
    //Se llama al método getAllCinemas() del servicio CinemaService, que devuelve un Observable que se suscribe, puede devolver (response) o (error).
    this.loginService.getAllManagers().subscribe({
      next: (response) => {
        this.managers = response.data;
        this.errorMessage = null; //borra el mensaje de error por si viene alguno viejo arrastrado
        this.loading = false;
      },
      error: (err) => {  //el observable emitio un error 
        //Si ocurre un error durante la solicitud HTTP, se asigna un mensaje genérico a errorMessage, y el error se imprime en la consola
        this.errorMessage = 'Ocurrio un error buscando los encargados, intente nuevamente.';
        console.error('Error getting managers:', err.error.message);
        this.loading = false;
      }
    });
  }
}
