import { Component } from '@angular/core';
import { Cinema, Snack, Promotion } from '../interfaces/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ɵDomAdapter } from '@angular/common';
import { PromotionsService } from '../promotions/promotions.service';
import { CinemaService } from '../cinemas/cinema.service';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-promotions-edit',
  templateUrl: './promotions-edit.component.html',
  styleUrls: ['./promotions-edit.component.css']
})
export class PromotionsEditComponent {
  promotionCode: string | null = null;
  promotionData: Promotion = {
    code: "",
    name: "",
    description: "",
    promotionStartDate: new Date(),
    promotionFinishDate: new Date(),
    discount: 0,
    cinemas: [],
    snacks: [],

  }
  isEditMode: boolean = false;
  promotionsForm!: FormGroup;
  errorMessage: string | null = null;
  errorMessageDates: string | null = null;

  allcinemas: Cinema[] = [];
  cinemasIds: number[] = [];

  allProducts: Snack[] = [];
  productsIds: number[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private promotionService: PromotionsService,
    private router: Router,
    private cinemaService: CinemaService,
    private productsService: ProductsService
  ) {
    this.promotionsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      promotionStartDate: new FormControl('', [Validators.required]),
      promotionFinishDate: new FormControl('', [Validators.required]),
      discount: new FormControl('', [Validators.required])
    })

    this.promotionsForm.valueChanges.subscribe(() => {
      this.errorMessageDates = this.validateDates();
    });
  }

  ngOnInit(): void {
    this.promotionCode = this.route.snapshot.params['code']
    if(this.promotionCode) {
      this.isEditMode = true;
      this.loadOnePromotion();
    } else {
      this.loadAllCinemas();
      this.loadAllProducts();
    }
  }
  
  
  loadOnePromotion() {
    if(this.promotionCode) {
      this.promotionService.getOnePromotions(this.promotionCode).subscribe({
        next: (response) => {
            this.promotionData = response.data;
            this.errorMessage = null;
            this.promotionsForm.setValue({
              name: this.promotionData.name,
              description: this.promotionData.description,
              promotionStartDate: this.formatToDateTimeLocal(this.promotionData.promotionStartDate),
              promotionFinishDate: this.formatToDateTimeLocal(this.promotionData.promotionFinishDate),
              discount: this.promotionData.discount
            })
            
            this.cinemasIds = this.promotionData.cinemas.map(cinema => cinema.id).filter((id): id is number => id !== undefined)
            this.loadAllCinemas();
            this.productsIds = this.promotionData.snacks.map(snack => snack.id).filter((id): id is number => id !== undefined)
            this.loadAllProducts();
          }, 
          error: (err) => {
            this.errorMessage = 'An error occurred while fetching the promotion.'
            console.error('Error getting promotion:', err.error.message);
            this.router.navigate(['/manager-home/promotions']);
          }
      })
    }
  }

  
  savePromotion() {
    this.promotionData.name = this.promotionsForm.get('name')?.value;
    this.promotionData.description = this.promotionsForm.get('description')?.value;
    this.promotionData.promotionStartDate = this.promotionsForm.get('promotionStartDate')?.value;
    this.promotionData.promotionFinishDate = this.promotionsForm.get('promotionFinishDate')?.value;
    this.promotionData.discount = this.promotionsForm.get('discount')?.value;
    this.promotionData.cinemas = this.cinemasIds.map(id => ({ id, name: '', address: '', theaters: [], movies: [] }));
    this.promotionData.snacks = this.productsIds.map(id => ({ id, name: '', description: "", urlPhoto: "" }));

    if(this.isEditMode) {
      if(this.promotionCode) {
        this.promotionService.updatePromotion(this.promotionCode, this.promotionData).subscribe({
          next: (response) => {
            console.log(response.data);
            this.errorMessage = null;
            this.router.navigate(['/manager-home/promotions'])
          },
          error: (err) => {
            this.errorMessage = 'Ocurrio un error al actualizar el producto.'
            console.error('Error updating movie:', err.error.message);
          }
        })
      }
    } else {
      this.promotionService.addPromotion(this.promotionData).subscribe({
        next: (response) => {
          console.log(response.data);
          this.errorMessage = null;
          this.router.navigate(['/manager-home/promotions'])
        },
        error: (err) => {
          this.errorMessage = 'Ocurrio un error al guardar la promoción.'
          console.error('Error saving promotion:', err.error.message);
        }
      })
    }
  }
  
  deletePromotion() {
    if(this.promotionCode) {
      this.promotionService.deletePromotion(this.promotionCode).subscribe({
        next: (response) => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/promotions'])
        },
        error: (err) => {
          this.errorMessage = 'Ocurrio un error al eliminar la promoción.'
          console.error('Error deleting promotion:', err.error.message);
        }
      })
    }
  }


  formatToDateTimeLocal(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // +1 porque getMonth() devuelve un valor entre 0 y 11
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  }

  loadAllCinemas() {
    this.cinemaService.getAllCinemas().subscribe({
      next: (response) => {
        this.allcinemas = response.data;
      },
      error: (err) => {
        console.error('Error getting all cinemas', err.error.message)
      }
    })
  }

  loadAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
      },
      error: (err) => {
        console.error('Error getting all products', err.error.message)
      }
    })
  }

  toggleCinemaSelection(cinemaId: number) {
    const index = this.cinemasIds.indexOf(cinemaId);
    if (index === -1) {
      this.cinemasIds.push(cinemaId);
    } else {
      this.cinemasIds.splice(index, 1);
    }
  }

  toggleProductsSelection(productId: number) {
    const index = this.productsIds.indexOf(productId);
    if (index === -1) {
      this.productsIds.push(productId);
    } else {
      this.productsIds.splice(index, 1);
    }
  }

  validateDates() {
    const startDate = new Date(this.promotionsForm.value.promotionStartDate);
    const endDate = new Date(this.promotionsForm.value.promotionFinishDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    if (!this.promotionsForm.value.promotionStartDate || !this.promotionsForm.value.promotionFinishDate) {
      return ''; // No hay error si las fechas no están completas
    }

    if (startDate < today || endDate < today) {
      return 'La fecha de inicio o de fin no puede ser anterior a la fecha de hoy.';
    }

    if (endDate < startDate) {
      return 'La fecha de fin no puede ser anterior a la fecha de inicio.';
    }

    return ''; // No hay errores
  }

}
