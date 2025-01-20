import { Component } from '@angular/core';
import { Promotion } from '../interfaces/interfaces';
import { PromotionsService } from './promotions.service';
import { CinemaService } from '../cinemas/cinema.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {

  promotions: Promotion[] = [];
  errorMessage: string | null = null;
  loading: boolean = true
  
  
    constructor(private promotionService: PromotionsService) {}
  
    ngOnInit(): void {
      this.loadPromotions();
    }
  
    loadPromotions() {
      this.promotionService.getAllPromotions().subscribe({
        next: (response) => {
          this.promotions = response.data;
          this.errorMessage = null;
          this.loading = false;
        },
  
        error: (err) => {
          this.errorMessage = 'Ocurrio un error buscando las promociones, intente nuevamente.';
          console.error('Error getting promotions:', err.error.message);
          this.loading = false;
        }
      })
    }

    
}
