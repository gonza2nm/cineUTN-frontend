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
  cinemas: Cinema[] = [];
  filterbyCinema: Promotion[] = [];

  constructor(
    private promotionService: PromotionsService,
    private cinemaService: CinemaService
  ) {}
  ngOnInit(): void {
    this.loadPromotions();
    this.loadCinemas();  
  }

  loadPromotions() {
      this.promotionService.getAllPromotions().subscribe({
        next: (response) => {
          this.promotions = response.data;
          this.filterbyCinema = this.promotions;
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
  
    loadCinemas() {
      this.cinemaService.getAllCinemas().subscribe({
        next: (response) => {
          this.cinemas = response.data.map((cinema: Cinema) => ({
          id: cinema.id,
          name: cinema.name,
          addres: cinema.address
        }));
          this.errorMessage = null;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Ocurrio un error al buscar los cines, intente nuevamente.';
          console.error('Error getting promotions:', err.error.message);
          this.loading = false;
        }
      })
    }
  

}
