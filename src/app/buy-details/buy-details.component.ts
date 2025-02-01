import { Component, Input, OnInit } from '@angular/core';
import { BuyService } from '../buy/buy.service';
import { Buy, Movie, Promotion, Show, Snack, Ticket, User } from '../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../tickets/ticket.service';
import { AuthService } from '../auth/auth.service';
import { MovieDetailsService } from '../movie-details/movie-details.service';

@Component({
  selector: 'app-buy-details',
  templateUrl: './buy-details.component.html',
  styleUrls: ['./buy-details.component.css'],
})
export class BuyDetailsComponent implements OnInit {
  buy: Buy = {
    id: 0,
    description: '',
    user: {
      id: 0
    } as User,
    total: 0,
    fechaHora: new Date(),
    status: '',
    tickets: [],
    snacks: []
  }
  user: User | null = null;
  buyId!: number;
  tickets: Ticket[] = [];
  snacks: Snack[] = [];
  promotions: Promotion[] = []
  show: Show = {
    id: 0,
    dayAndTime: new Date(),
    finishTime: new Date(),
    format: { id: 0, formatName: '' },
    language: { id: 0, languageName: '' },
    movie: {
      cinemas: [],
      description: '',
      formats: [],
      genres: [],
      id: 0,
      imageLink: '',
      languages: [],
      name: '',
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
    tickets: [],
  };
  movie!: Movie;
  errorMessage: string | null = null;
  messageCanceled = '';
  isExpired: boolean = false;
  showDay: string = '';
  showHour: string = '';
  qrCodeUrl: string = '';

  constructor(
    private movieDatialsService: MovieDetailsService,
    private authService: AuthService,
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private buyService: BuyService
  ) { }

  ngOnInit() {
    this.scrollToTop();
    this.authService.user.subscribe((user) => this.user = user);
    this.buyId = this.route.snapshot.params['id'];
    if (!this.buyId) {
      this.errorMessage =
        'No se encontro el id de la compra, por favor retroceda y vuelva a seleccionarla';
    } else {
      this.loadPurchase();
      this.loadTickets(this.buyId);
      this.loadQRcode();
    }
  }

  detailsOff() {
    this.router.navigate(['/my-account']);
  }

  checkIfExpired() {
    if (this.show.dayAndTime) {
      let showDate = new Date(this.show.dayAndTime);
      let dateToday = new Date();
      let date2 = showDate.getTime() - dateToday.getTime();

      if (date2 > 12 * 60 * 60 * 1000) {
        this.isExpired = true;
      }
    }
  }

  loadPurchase() {
    this.buyService.getOneBuy(this.buyId).subscribe({
      next: (response) => {
        this.buy = response.data;
        this.snacks = response.data.snacks;
        this.promotions = response.data.promotions;
        console.log(response);
      },

      error: () => {
        console.error('Ocurrio un error al buscar la compra');
      },
    });
  }

  loadTickets(id: number): void {
    this.ticketService.getTicketsByBuy(id).subscribe({
      next: (response) => {
        console.log(response.data);
        this.tickets = response.data;
        this.errorMessage = null;
        if (this.tickets[0]) {
          this.show = this.tickets[0].show;
          this.checkIfExpired();
        }
      },

      error: () => {
        this.errorMessage = 'Ocurrio un error al buscar la funcion.';
        console.error('Ocurrio un error al buscar la funcion.');
      },
    });
  }

  cancelPurchase() {
    this.ticketService.deleteTickets(this.buyId).subscribe({
      next: (response) => {
        console.log(response.data);
        let status = 'Cancelada';
        this.buyService.updatebuy(this.buyId, status).subscribe({
          next: () => {
            console.log(response.data);
            this.messageCanceled = 'La compra fue cancelada.';
            this.router.navigate(['/my-account'])
          },

          error: (err) => {
            console.log('Error de compra');
            console.log(err.message);
            console.log(err.error);
          },
        });
      },
      error: (err) => {
        console.log('Error de Tickets');
        console.log(err.message);
        console.log(err.error);
      },
    });
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


  loadQRcode() {
    this.buyService.getQRCodeBuy(this.buyId).subscribe({
      next: (response) => {
        if (response.qrCodeUrl) {
          this.qrCodeUrl = response.qrCodeUrl;
        }
      },
      error: (err) => {
        console.error('Error loading the QR code', err.error)
      },
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
