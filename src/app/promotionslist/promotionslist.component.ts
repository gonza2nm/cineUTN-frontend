import { Component, OnInit } from '@angular/core';
import { Cinema, Promotion } from '../interfaces/interfaces';
import { PromotionsService } from '../promotions/promotions.service';
import { CinemaService } from '../cinemas/cinema.service';

@Component({
  selector: 'app-promotionslist',
  templateUrl: './promotionslist.component.html',
  styleUrls: ['./promotionslist.component.css']
})
export class PromotionslistComponent implements OnInit {
  
  promotions: Promotion[] = [];
  errorMessage: string | null = null;
  loading: boolean = true;

  constructor(
    private promotionService: PromotionsService,
  ) {}
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
          this.errorMessage = 'Ocurrio un error al buscar las promociones, intente nuevamente.';
          console.error('Error getting promotions:', err.error.message);
          this.loading = false;
        }
      })
    }
  

}
