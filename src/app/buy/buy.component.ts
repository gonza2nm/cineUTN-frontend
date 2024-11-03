import { Component } from '@angular/core';
import { Show, User } from '../interfaces/interfaces.js';
import { MovieDetailsService } from '../movie-details/movie-details.service';
import { LoginService } from '../login/login.service';
import { BuyService } from './buy.service';

interface Item {
  descripcion: string;
  costo: number;
  counter: number;
  subtotal: number;
}

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {

  constructor(
    private movieDatialsService: MovieDetailsService,
    private loginService: LoginService,
    private buyService: BuyService
  ) {}

  //Obtiente los datos de la peli y la función.
  show: Show = this.movieDatialsService.getMovieData();
  user: User = this.loginService.getOneUser();

  showDay = this.movieDatialsService.getFormattedWeekday(this.show.dayAndTime);
  showHour = this.movieDatialsService.getShowHourAndDay(this.show);
  //showThaterCantSillas = this.show.theater.numChairs;
  //showThaterCantSillas2 = this.show.theater.numChairs;

  //------------------------------------------------------------------------

  /*
  showp = 
    {
      imageLink: 'https://a.ltrbxd.com/resized/film-poster/9/3/6/7/6/93676-guardians-of-the-galaxy-0-1000-0-1500-crop.jpg?v=3cc8cb967f',
      name: 'Guardianes de la galaxia',
      diaFuncion: '2024-11-05',
      horario: '20:00',
      formato: 'IMAX',
      idioma: 'Español'
    }
  */
  


  //------------------------------------------------------------------------

  increment(item: Item) {
    item.counter++;
    this.updateSubtotal(item)
  }

  decrement(item: Item) {
    if (item.counter > 0) {
      item.counter--;
      this.updateSubtotal(item)
    }
  }

  items: Item[] = [
    { descripcion: 'Entrada general', costo: 4500, subtotal: 0, counter: 0 },
    { descripcion: 'Para niños', costo: 3000, subtotal: 0, counter: 0 },
    { descripcion: 'Para adultos', costo: 3500, subtotal: 0, counter: 0 }
  ];

  //Para mostrar el total de las compras
  totalCompras = 0;
  totalEntradas = 0;

  updateSubtotal(item: any) {
    item.subtotal = item.costo * item.counter;
    this.calculateTotal();
    this.calculateTotalTickets();
  }

  calculateTotal() {
    this.totalCompras = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }
  
  calculateTotalTickets() {
    this.totalEntradas = this.items.reduce((sum, item) => sum + item.counter, 0);
    //this.showThaterCantSillas2 = this.showThaterCantSillas;
    //this.showThaterCantSillas2 = this.showThaterCantSillas2 - this.totalEntradas;
  }
  
  //------------------------------------------------------------------------

  //Cambia las secciones.
  step: number = 1;

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  //------------------------------------------------------------------------

  buyAcepted = false;

  confirmPurchase() {
    // Lógica para confirmar la compra
    this.buyAcepted = true;

    //this.user.id = 5

    
    this.buyService.addBuy("Compra de entradas", this.totalCompras, this.user.id).subscribe ({
      next: (response:any) => {
        
        this.buyService.addtickets(this.show.id, response.data.id, this.totalEntradas).subscribe({
          next: () => {
            console.log('Todas las entradas completadas:')
          },
          error: () => {
            console.log("No se pudo realizar la compra de la entrada");
            // Si ocurre un error al crear las entradas, elimina la compra.
            this.buyService.deleteBuy(response.data.id).subscribe({
              next: () => {
                console.log("Compra revertida debido al fallo en la creación de entradas");
              },
              error: () => {
                console.log("No se pudo revertir la compra");
              }
            });
          }
        })        
      },

      error: () => {
        console.log("No se pudo realizar la compra");
      }
    })
    
  }
  

  
}

