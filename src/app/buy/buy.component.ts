import { Component, OnInit } from '@angular/core';
import { MovieDetailsService } from '../movie-details/movie-details.service';
import { BuyService } from './buy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProductsService } from '../products/products.service';
import { PromotionsService } from '../promotions/promotions.service';
import { User } from '../interfaces/user.interface.js';
import { Show } from '../interfaces/show.interface.js';
import { Snack } from '../interfaces/snack.interface.js';
import { Seat } from '../interfaces/seat.interface.js';
import { Promotion } from '../interfaces/promotion.interface.js';

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

  user: User | null = null;
  errorMessage: string | null = null;
  showId!: number;
  show: Show = {
    id: 0,
    dayAndTime: new Date(),
    finishTime: new Date(),
    format: { id: 0, formatName: "" },
    language: { id: 0, languageName: "" },
    movie: {
      cinemas: [],
      description: "",
      duration: 0,
      formats: [],
      genres: [],
      id: 0,
      imageLink: "",
      languages: [],
      name: ""
    },
    theater: {
      cinema: {
        id: 0,
        name: '',
        address: '',
        theaters: [],
        movies: [],
      }, id: 0, numChairs: 0, cantRows: 0, cantCols: 0
    },
    tickets: []
  }
  loading = true;
  items: Item[] = [
    { descripcion: 'Entrada general', costo: 4500, counter: 0 },
    { descripcion: 'Niño', costo: 3000, counter: 0 },
    { descripcion: 'Jubilados', costo: 3500, counter: 0 },
  ];

  totalPrice = 0;
  totalCantTickets = 0;
  step: number = 1;
  buyAcepted = false;
  errorMessageBuy: boolean = true;

  purchaseChoice: string = 'entrada';
  snacks: Snack[] = [];
  selectedSnacks: { id: number, name: string, price: number, cant: number }[] = [];

  promotions: Promotion[] = [];
  selectedPromotions: { code: string, name: string, price: number, cant: number }[] = [];

  seats: Seat[] = [];
  selectedSeats: Seat[] = [];


  constructor(
    private movieDatialsService: MovieDetailsService,
    private authService: AuthService,
    private buyService: BuyService,
    private route: ActivatedRoute,
    private router: Router,
    private snackService: ProductsService,
    private promotionService: PromotionsService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user
    })
    this.showId = this.route.snapshot.params['id'];
    if (!this.showId) {
      this.errorMessage = 'No se encontro el id de esa funcion, por favor retroceda y vuelva a seleccionarla';
    } else {
      this.loadShow();
      this.loadSeats();
      this.loading = false;
    }
    this.loadSnacks();
    this.loadPromotions();
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

  handleChangeOption(option: string) {
    this.purchaseChoice = option;
  }

  countSeatsAvailables() {
    return this.seats.reduce((count, seat) => seat.status === "Disponible" ? count + 1 : count, 0)
  }

  updateQuantityTickets(ticket: Item, change: number) {
    if (this.totalCantTickets + change > this.countSeatsAvailables()) {
      console.log('No puedes comprar más tickets que asientos disponibles');
      return;
    }
    ticket.counter = Math.max(0, ticket.counter + change);
    this.totalCantTickets = this.items.reduce(
      (sum, ticket) => sum + ticket.counter, 0);
  }


  addProductToList(snack: Snack, change: number) {
    const indexSnack = this.selectedSnacks.findIndex(item => item.id === snack.id)
    if (indexSnack === -1) {
      this.selectedSnacks.push({ id: snack.id, name: snack.name, price: snack.price, cant: 1 });

    } else {
      const newCant = this.selectedSnacks[indexSnack].cant + change;

      if (newCant <= 0) {
        this.selectedSnacks.splice(indexSnack, 1)
      } else {
        this.selectedSnacks[indexSnack].cant = newCant;
      }
    }
  }

  getSnackCount(snack: Snack) {
    const foundSnack = this.selectedSnacks.find(item => item.id === snack.id);
    return foundSnack ? foundSnack.cant : 0;
  }


  addPromotionToList(promo: Promotion, change: number) {
    const indexPromotion = this.selectedPromotions.findIndex(item => item.code === promo.code)
    if (indexPromotion === -1) {
      this.selectedPromotions.push({ code: promo.code, name: promo.name, price: promo.price, cant: 1 });

    } else {
      const newCant = this.selectedPromotions[indexPromotion].cant + change;

      if (newCant <= 0) {
        this.selectedPromotions.splice(indexPromotion, 1)
      } else {
        this.selectedPromotions[indexPromotion].cant = newCant;
      }

    }
  }

  getPomotionCount(promo: Promotion) {
    const foundPromotion = this.selectedPromotions.find(item => item.code === promo.code);
    return foundPromotion ? foundPromotion.cant : 0;
  }

  getTotalTickets() {
    return this.items.reduce(
      (subtotal, ticket) => subtotal + ticket.costo * ticket.counter,
      0
    );
  }

  getTotalSnacks() {
    return this.selectedSnacks.reduce(
      (subtotal, snack) => subtotal + snack.price * snack.cant,
      0
    );
  }

  getTotalPromos() {
    return this.selectedPromotions.reduce(
      (subtotal, promo) => subtotal + promo.price * promo.cant,
      0
    );
  }

  calculateTotal() {
    this.totalPrice = this.getTotalTickets() + this.getTotalSnacks() + this.getTotalPromos();
  }

  formatDateAndHour(date: Date) {
    const fecha = new Date(date);
    const year = fecha.getFullYear();
    const diaMes = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');

    let hour = fecha.getHours().toString().padStart(2, '0');
    let minutes = fecha.getMinutes().toString().padStart(2, '0');
    return `${diaMes}/${mes}/${year} - ${hour}:${minutes} hs`;
  }

  loadShow() {
    this.movieDatialsService.getOneShow(this.showId).subscribe({
      next: (response) => {
        console.log('Datos del show', response)
        this.show = response;
        this.errorMessage = null;
      },
      error: () => {
        this.errorMessage = 'Ocurrio un error al buscar la funcion';
        console.error('Ocurrio un error al buscar la funcion');
        this.router.navigate(['/']);
      },
    });
  }

  loadSeats() {
    this.buyService.getSeatsbyShow(this.showId).subscribe({
      next: (response) => {
        this.seats = response.data;
        this.errorMessage = null;
      },

      error: () => {
        this.errorMessage = 'Ocurrio un error al buscar los asientos';
        console.error('Ocurrio un error al buscar los asientos');
        this.router.navigate(['/']);
      },
    })
  }

  loadSnacks() {
    this.snackService.getAllProducts().subscribe({
      next: (response) => {
        this.snacks = response.data;
      },
      error: () => {
        this.errorMessage = 'Ocurrio un error al buscar los snacks';
        console.error('Ocurrio un error al buscar los snacks');
      },
    });
  }

  loadPromotions() {
    this.promotionService.getAllPromotions().subscribe({
      next: (response) => {
        this.promotions = response.data;
      },
      error: () => {
        this.errorMessage = 'Ocurrio un error al buscar las promociones';
        console.error('Ocurrio un error al buscar las promociones');
      },
    });
  }

  confirmPurchase() {
    this.calculateTotal();
    this.selectedSnacks.map(snack => ({ id: snack.id, cant: snack.cant }));
    this.selectedPromotions.map(promo => ({ code: promo.code, cant: promo.cant }));
    if (this.user) {
      this.buyService.addBuy(this.totalPrice, this.user.id, this.show.id, this.selectedSnacks, this.selectedPromotions, this.selectedSeats).subscribe({
        next: (response) => {
          console.log(response.data);
          this.errorMessageBuy = true;
          this.buyAcepted = true;
          setTimeout(() => {
            this.buyAcepted = false;
            this.router.navigate(['/my-account']);
          }, 3000);
        },
        error: (err) => {
          console.log('No se pudo realizar la compra');
          console.log('Error', err.error)
          this.errorMessageBuy = false;
          this.buyAcepted = true;
          setTimeout(() => {
            this.buyAcepted = false;
            this.router.navigate(['/my-account']);
          }, 3000);
        }
      })
    }
  }

  toggleSeatSelect(seat: Seat) {
    if (seat.status !== 'Ocupado') {
      const index = this.selectedSeats.indexOf(seat);
      if (index === -1) {
        if (this.selectedSeats.length < this.totalCantTickets) {
          this.selectedSeats.push(seat);
        } else {
          this.selectedSeats.shift();
          this.selectedSeats.push(seat);
        }
      } else {
        this.selectedSeats.splice(index, 1);
      }
    }
  }

  orderSeats() {
    if (this.step === 3) {
      return this.selectedSeats.sort((a, b) => a.seatNumber.localeCompare(b.seatNumber));
    } else {
      return this.selectedSeats;
    }
  }
}
