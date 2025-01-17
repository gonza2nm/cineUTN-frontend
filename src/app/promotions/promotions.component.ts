import { Component } from '@angular/core';
import { Promotion } from '../interfaces/interfaces';
import { PromotionsService } from './promotions.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {

  promotions: Promotion[] = [];


  constructor(private promotionService: PromotionsService) { }

  ngOnInit(): void {
    this.loadPromotions();
  }



  loadPromotions() {
    this.promotionService.getPromotions().subscribe({
      next: (response) => {
        this.promotions = response.data;
      },

      error: (err) => {
        
      }
    })
  }
}
