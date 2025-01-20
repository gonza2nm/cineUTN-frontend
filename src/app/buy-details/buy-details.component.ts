import { Component, Input, OnInit } from '@angular/core';
import { BuyService } from '../buy/buy.service';
import { Buy, Movie, Show, Ticket, User } from '../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MyAccountService } from '../my-account/my-account.service';
import { TicketService } from '../tickets/ticket.service';
import { AuthService } from '../auth/auth.service';
import { MovieDetailsService } from '../movie-details/movie-details.service';

@Component({
  selector: 'app-buy-details',
  templateUrl: './buy-details.component.html',
  styleUrls: ['./buy-details.component.css'],
})
export class BuyDetailsComponent implements OnInit {
  buy: Buy | null = null;
  user: User | null = null;
  buyId!: number;
  tickets: Ticket[] = [];
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
    theater: { cinema: 0, id: 0, numChairs: 0 },
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
    private myAcountService: MyAccountService,
    private movieDatialsService: MovieDetailsService,
    private authService: AuthService,
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private buyService: BuyService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.buyId = this.route.snapshot.params['id'];
    console.log(this.buyId);
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
          this.showDay = this.movieDatialsService.getFormattedWeekday(this.show.dayAndTime);
          this.showHour = this.movieDatialsService.getShowHourAndDay(this.show);
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
        let status = 'cancelado';
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

  /*

  cancelPurchase(showDate: Date) {
    
    let showDate$ = new Date(showDate)
    let dateToday = new Date()

    let date2 = showDate$.getTime() - dateToday.getTime() ;

    if(date2 > (12*60*60*1000)) {

      this.ticketService.deleteTickets(this.buyId).subscribe({
        next: (response) => {
          console.log(response.data);
          let status = 'cancelado';
          this.buyService.updatebuy(this.buyId, status).subscribe({
            next: () => {
              console.log(response.data);
              this.messageCanceled = "La compra fue cancelada.";
            },

            error: (err) => {
              console.log('Error de compra');
              console.log(err.message);
              console.log(err.error);
            }
          })
        },
        error: (err) => {
          console.log('Error de Tickets')
          console.log(err.message);
          console.log(err.error);
        }
      })

    } else {
      this.messageCanceled = "La compra solo se puede cancelar hasta 12hs antes de la función."
    }

  }

  */
}
