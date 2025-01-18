import { Component } from '@angular/core';
import { Promotion, Ticket } from '../interfaces/interfaces';
import { PromotionsService } from './promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {

  promotions: Promotion[] = [];
  //
  tickets: Ticket[] = []


  constructor(private promotionService: PromotionsService) { }

  ngOnInit(): void {

    //this.loadPromotions();
    //
    this.loadTickets();
  }



  loadPromotions() {
    this.promotionService.getPromotions().subscribe({
      next: (response) => {
        this.promotions = response.data;
      },

      error: (err) => {
        console.log(err)
      }
    })
  }

  //
  loadTickets() {
    this.promotionService.getTicketsbyId().subscribe({
      next: (response) => {
        this.tickets = response.data;
      },

      error: (err) => {
        console.log('Hubo un problema', err)
      }
    })
  }
}
