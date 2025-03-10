import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Snack } from '../interfaces/snack.interface.js';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Snack[] = [];
  errorMessage: string | null = null;
  loading: boolean = true


  constructor(private productsSerive: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productsSerive.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.errorMessage = null;
        this.loading = false;
      },

      error: (err) => {
        this.errorMessage = 'Ocurrio un error buscando los productos, intente nuevamente.';
        console.error('Error getting products:', err.error.message);
        this.loading = false;
      }
    })
  }
}
