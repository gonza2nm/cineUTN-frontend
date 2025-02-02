import { Component, OnInit } from '@angular/core';
import { Promotion, Show, Snack, User } from '../interfaces/interfaces.js';
import { MovieDetailsService } from '../movie-details/movie-details.service';
import { BuyService } from './buy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ProductsService } from '../products/products.service';
import { PromotionsService } from '../promotions/promotions.service';

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
      }, id: 0, numChairs: 0
    },
    tickets: []
  }
  loading = true;
  items: Item[] = [
    { descripcion: 'Entrada general', costo: 4500, counter: 0 },
    { descripcion: 'Para niños', costo: 3000, counter: 0 },
    { descripcion: 'Para adultos', costo: 3500, counter: 0 },
  ];

  totalPrice = 0;
  totalCantTickets = 0;
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  showDay = this.movieDatialsService.getFormattedWeekday(this.show.dayAndTime);
  step: number = 1;
  buyAcepted = false;
  errorMessageBuy: boolean = true;

  purchaseChoice: string = 'entrada';
  snacks: Snack[] = [];
  selectedSnacks: { id: number, name: string, price: number }[] = []

  promotions: Promotion[] = [];
  selectedPromotions: { code: string, name: string, price: number }[] = []



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

  updateQuantityTickets(ticket: Item, change: number) {
    ticket.counter = Math.max(0, ticket.counter + change);
    this.totalCantTickets = this.items.reduce(
      (sum, ticket) => sum + ticket.counter,
      0
    );
  }

  addProductToList(snack: Snack) {
    const indexSnack = this.selectedSnacks.findIndex(item => item.id === snack.id)
    if (indexSnack === -1) {
      this.selectedSnacks.push({ id: snack.id, name: snack.name, price: snack.price });

    } else {
      this.selectedSnacks.splice(indexSnack, 1)

    }
  }

  snackIsInList(snack: any) {
    const indexSnack = this.selectedSnacks.findIndex(item => item.id === snack.id)
    if (indexSnack === -1) {
      return false
    } else {
      return true
    }
  }

  addPromotionToList(promo: Promotion) {
    const indexPromotion = this.selectedPromotions.findIndex(item => item.code === promo.code)
    if (indexPromotion === -1) {
      this.selectedPromotions.push({ code: promo.code, name: promo.name, price: promo.price });

    } else {
      this.selectedPromotions.splice(indexPromotion, 1)

    }
  }

  promoIsInList(promo: Promotion) {
    const indexPromo = this.selectedPromotions.findIndex(item => item.code === promo.code)
    if (indexPromo === -1) {
      return false
    } else {
      return true
    }
  }

  getTotalTickets() {
    return this.items.reduce(
      (subtotal, ticket) => subtotal + ticket.costo * ticket.counter,
      0
    );
  }

  getTotalSnacks() {
    return this.selectedSnacks.reduce(
      (subtotal, snack) => subtotal + snack.price,
      0
    );
  }

  getTotalPromos() {
    return this.selectedPromotions.reduce(
      (subtotal, promo) => subtotal + promo.price,
      0
    );
  }

  calculateTotal() {
    this.totalPrice = this.getTotalTickets() + this.getTotalSnacks() + this.getTotalPromos();
  }

  formatDateAndHour(show: Show) {
    const fecha = new Date(show.dayAndTime);
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
    if (this.user) {
      this.buyService.addBuy('Compra de entradas', this.totalPrice, this.user.id, this.show.id, this.totalCantTickets, this.selectedSnacks, this.selectedPromotions).subscribe({
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
}
