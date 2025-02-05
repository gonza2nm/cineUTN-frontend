import { Component, Input, OnInit } from '@angular/core';
import { BuyService } from '../buy/buy.service';
import { Buy, Movie, Promotion, Seat, Show, Snack, Ticket, User } from '../interfaces/interfaces';
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
  isOpen = false;
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
    snacksBuy: [],
    promotionsBuy: []
  }
  user: User | null = null;
  buyId!: number;
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
    theater: { cinema: 0, id: 0, numChairs: 0, cantRows: 0, cantCols:0 },
    tickets: []
  };
  errorMessage: string | null = null;
  messageCanceled = '';
  isExpired: boolean = false;
  qrCodeUrl: string = '';

  constructor(
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

      if (date2 < 12 * 60 * 60 * 1000) {
        this.isExpired = true;
      }
    }
  }

  loadPurchase() {
    this.buyService.getOneBuy(this.buyId).subscribe({
      next: (response) => {
        console.log('Datos de la compra', response.data)
        this.buy = response.data;
        this.show = response.data.tickets[0].show;
        this.checkIfExpired();
      },
      error: () => {
        console.error('Ocurrio un error al buscar la compra');
      },
    });
  }

  cancelPurchase() {
    this.ticketService.deleteTickets(this.buyId).subscribe({
      next: (response) => {  
        //Se actualiza el estado de la compra.
        let status = 'Cancelada';
        this.buyService.updatebuy(this.buyId, status).subscribe({
          next: () => {
            //Se actualiza el estado de los asientos a disponible.
            const seatIds = this.buy.tickets.map(ticket => ticket.seat.id);
            this.buyService.updateSeatbyShow(this.show.id, seatIds).subscribe({
              next: (response) => {
                console.log(response.data);
                this.messageCanceled = 'La compra fue cancelada.';
                this.router.navigate(['/my-account'])
              },
              error: (err) => {
                console.log('Error de Seat');
                console.log(err.message);
                console.log(err.error);
              },
            })
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
