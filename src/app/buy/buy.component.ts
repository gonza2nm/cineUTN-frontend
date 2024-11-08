import { Component, OnInit } from '@angular/core';
import { Show, User } from '../interfaces/interfaces.js';
import { MovieDetailsService } from '../movie-details/movie-details.service';
import { BuyService } from './buy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TicketService } from '../ticket.service';

interface Item {
  descripcion: string;
  costo: number;
  counter: number;
}

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit {
  errorMessage: string | null = null;
  showId!: number;
  show: Show = {
    id:0,
    dayAndTime:new Date(),
    finishTime:new Date(),
    format: {id:0,formatName:""},
    language:{id:0, languageName:""},
    movie:{cinemas:[],
      description:"",
      formats:[],
      genres:[],
      id:0,
      imageLink:"",
      languages: [],
      name:""
    },
    theater:{cinema:0,id:0,numChairs:0},
    tickets:[]
  }
  loading = true;
  items: Item[] = [
    { descripcion: 'Entrada general', costo: 4500, counter: 0 },
    { descripcion: 'Para niños', costo: 3000, counter: 0 },
    { descripcion: 'Para adultos', costo: 3500, counter: 0 },
  ];
  total = 0;
  totalEntradas = 0;
  user: User | null = this.authService.getUser();
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  showDay = this.movieDatialsService.getFormattedWeekday(this.show.dayAndTime);
  step: number = 1;
  buyAcepted = false;
  

  constructor(
    private movieDatialsService: MovieDetailsService,
    private authService: AuthService,
    private buyService: BuyService,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showId = this.route.snapshot.params['id'];
    if (!this.showId) {
      this.errorMessage =
        'No se encontro el id de esa funcion, por favor retroceda y vuelva a seleccionarla';
    } else {
      this.movieDatialsService.getOneShow(this.showId).subscribe({
        next: (response) => {
          this.show = response;
          this.errorMessage = null;
        },
        error: () => {
          this.errorMessage = 'Ocurrio un error al buscar la funcion';
          console.error('Ocurrio un error al buscar la funcion');
          this.router.navigate(['/']);
        },
      });
      this.loading = false;
    }
  }

  formatHour(show: Show){
    return this.movieDatialsService.getShowHourAndDay(show);
  }
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

  calculateTotal() {
    this.total = this.items.reduce(
      (sum, item) => sum + item.costo * item.counter,
      0
    );
  }

  calculateTotalTickets() {
    this.totalEntradas = this.items.reduce(
      (sum, item) => sum + item.counter,
      0
    );
    //this.showThaterCantSillas2 = this.showThaterCantSillas;
    //this.showThaterCantSillas2 = this.showThaterCantSillas2 - this.totalEntradas;
  }
  confirmPurchase() {
    this.buyAcepted = true;
    console.log("total de tickets: ",this.totalEntradas)
    this.calculateTotal();
    console.log("total: ",this.total)
    if(this.user){
      this.buyService
        .addBuy('Compra de entradas', this.total, this.user.id)
        .subscribe({
          next: (response: any) => {
            this.ticketService.
              addtickets(this.show.id, response.data.id, this.totalEntradas)
              .subscribe({
                next: () => {
                  console.log('Todas las entradas completadas:');
                },
                error: () => {
                  console.log('No se pudo realizar la compra de la entrada');
                  // Si ocurre un error al crear las entradas, elimina la compra.
                  this.buyService.deleteBuy(response.data.id).subscribe({
                    next: () => {
                      console.log(
                        'Compra revertida debido al fallo en la creación de entradas'
                      );
                    },
                    error: () => {
                      console.log('No se pudo revertir la compra');
                    },
                  });
                },
              });
          },
          error: () => {
            console.log('No se pudo realizar la compra');
          },
        });
    }
  }

  updateQuantity(ticket: Item, change: number) {
    ticket.counter = Math.max(0, ticket.counter + change);
    this.totalEntradas = this.items.reduce(
      (sum, ticket) => sum + ticket.counter,
      0
    );
  }

  getTotal() {
    return this.items.reduce(
      (subtotal, ticket) => subtotal + ticket.costo * ticket.counter,
      0
    );
  }

  //showThaterCantSillas = this.show.theater.numChairs;
  //showThaterCantSillas2 = this.show.theater.numChairs;
}
