import { Component } from '@angular/core';
import { Show, Ticket, User } from '../interfaces/interfaces.js';
import { MovieDetailsService } from '../movie-details/movie-details.service';
import { LoginService } from '../login/login.service';
import { BuyService } from './buy.service';
import { TicketService } from '../ticket.service';

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

  user!: User;

  constructor(
    private movieDatialsService: MovieDetailsService,
    private loginService: LoginService,
    private buyService: BuyService,
    private ticketService: TicketService
  ) {}

  ngOnInit() {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
    }

  

  //Obtiente los datos de la peli y la función.
  show: Show = this.movieDatialsService.getMovieData();
  //Obtiene los datos del usuario
  //user: User = this.loginService.getOneUser();


  showDay = this.movieDatialsService.getFormattedWeekday(this.show.dayAndTime);
  showHour = this.movieDatialsService.getShowHourAndDay(this.show);

  //Para mostrar el total de las compras
  totalPurchases = 0;
  totalTickets = 0;
  
  //showThaterCantSillas = this.show.theater.numChairs;
  //showThaterCantSillas2 = this.show.theater.numChairs;


  items: Item[] = [
    { descripcion: 'Entrada general', costo: 4500, subtotal: 0, counter: 0 },
    { descripcion: 'Para niños', costo: 3000, subtotal: 0, counter: 0 },
    { descripcion: 'Para adultos', costo: 3500, subtotal: 0, counter: 0 }
  ];



  //Para cambiar los numeros del input
  increment(item: Item) {
    if (item.counter < 6)
    item.counter++;
    this.updateSubtotal(item)
  }

  decrement(item: Item) {
    if (item.counter > 0) {
      item.counter--;
      this.updateSubtotal(item)
    }
  }

  updateSubtotal(item: any) {
    item.subtotal = item.costo * item.counter;
    this.calculateTotal();
    this.calculateTotalTickets();
  }

  calculateTotal() {
    this.totalPurchases = this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }
  
  calculateTotalTickets() {
    this.totalTickets = this.items.reduce((sum, item) => sum + item.counter, 0);
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

    this.buyAcepted = true;

    
    this.buyService.addBuy("Compra de entradas", this.totalPurchases, this.user.id).subscribe ({
      next: (response) => {
        
        this.ticketService.addtickets(this.show.id, response.data.id, this.totalTickets).subscribe({
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

