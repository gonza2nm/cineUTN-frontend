import { Component, OnInit } from '@angular/core';
import { BuyService } from '../buy/buy.service';
import { Buy, Movie, Show, Ticket } from '../interfaces/interfaces';
import { Router } from '@angular/router';
import { MyAccountService } from '../my-account/my-account.service';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-buy-details',
  templateUrl: './buy-details.component.html',
  styleUrls: ['./buy-details.component.css']
})
export class BuyDetailsComponent implements OnInit {

  buy!: Buy;
  tickets: Ticket[] = [];
  show!: Show;
  movie!: Movie;
  messageCanceled  = '';

  constructor(
    private myAcountService: MyAccountService,
    private ticketService: TicketService,
    private router: Router,
    private buyService: BuyService,
  ) {}


  ngOnInit() {
    this.buy = this.myAcountService.getOnePurchase();
    if (this.buy) {
      this.loadTickets(this.buy.id);
    }    
  }


  detailsOff() {
    this.router.navigate(['/my-account'])
  }


  // --------------------------------------------------------------

  
  loadTickets(id:number):void {
    this.ticketService.getTickets(id).subscribe({
      next: (response) => {
        console.log(response.data)
        this.tickets = response.data;
        if (this.tickets[0]) {
          this.show = this.tickets[0].show;
        }
      },

      error: (err) => {
        console.log(err)
      }
    })
  }


  /*
  loadshow(id:number):void {
    this.ticketService.getShow(id).subscribe({
      next: (response) => {
        console.log(response.data)
        this.show = response.data;
      },

      error: (err) => {
        console.log(err)
      }
    })
  }
    */



  

  // ---------------------------------------------------------------

  cancelPurchase(id: number, showDate: Date) {
    
    let showDate$ = new Date(showDate)
    let dateToday = new Date()

    let date2 = showDate$.getTime() - dateToday.getTime() ;

    if(date2 > (12*60*60*1000)) {

      this.ticketService.deleteTickets(id).subscribe({
        next: (response) => {
          console.log(response.data);
          let status = 'cancelado';
          this.buyService.updatebuy(id, status).subscribe({
            next: () => {
              console.log(response.data);
              this.messageCanceled = "La compra fue cancelada con exito";
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
        
      //this.myAcountService.setStatus('cancelado');
      /*
      this.buyService.deleteBuy(id).subscribe({
        next: (response) => {
          console.log(response.data);
          this.messageCanceled = "La compra fue cancelada con exito."
        },
        error: (error) => {
          console.log(error);
          this.messageCanceled = "La compra no se puede cancelar"
        }
      })
      */
    } else {
      this.messageCanceled = "La compra solo se puede cancelar hasta 12hs antes de la función."
    }

  }

}
