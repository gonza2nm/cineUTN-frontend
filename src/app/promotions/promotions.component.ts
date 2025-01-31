import { Component } from '@angular/core';
import { Cinema, Promotion, Show } from '../interfaces/interfaces';
import { PromotionsService } from './promotions.service';
import { Router } from '@angular/router';
import { CinemaService } from '../cinemas/cinema.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent {

  promotions: Promotion[] = [];
  errorMessage: string | null = null;
  loading: boolean = true;
  cinemas: Cinema[] = [];
  filterbyCinema: Promotion[] = [];
  selectedOption: any = '';

  
  constructor(
    private promotionService: PromotionsService,
    private router: Router,
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

  loadPromotionsByCinema(cinemaId: number) {
    this.promotionService.getAllPromotionsbyCinema(cinemaId).subscribe({
      next: (response) => {
        this.filterbyCinema = response.data
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

  getFormattedWeekday(date: Date) {
    const fecha = new Date(date);
    const year = fecha.getFullYear();
    const diaMes = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    return `${diaMes}/${mes}/${year} `;
  }


  onFilterChange() {
    if (this.selectedOption) {
      const selectedCinemaId = this.selectedOption?.id;
      this.loadPromotionsByCinema(selectedCinemaId);
    } else {
      this.filterbyCinema = this.promotions;
    }
  }

  
}

