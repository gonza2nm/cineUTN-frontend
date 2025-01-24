import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Snack } from '../interfaces/interfaces';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent {

  productId: number | null = null;
  productData: Snack = {
    id: 0,
    name: "",
    description: "",
    urlPhoto: ""
  }
  isEditMode: boolean = false;
  productsForm!: FormGroup;
  urlPhoto: string = "";
  errorMessage:string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {
    
    this.productsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      urlPhoto: new FormControl('', [Validators.required]),
    })

    this.productsForm.get('urlPhoto')?.valueChanges.subscribe((value: string) => {
      this.urlPhoto = value;
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id']
    if(this.productId) {
      this.isEditMode = true;
      this.loadOneProduct();
    }
  }

  loadOneProduct() {
    if(this.productId) {
      this.productService.getOneProduct(this.productId).subscribe({
        next: (response) => {
          this.productData = response.data;
          this.errorMessage = null;
          this.productsForm.setValue({
            name: this.productData.name,
            description: this.productData.description,
            urlPhoto: this.productData.urlPhoto
          })
        }, 
        error: (err) => {
          this.errorMessage = 'An error occurred while fetching the movie.'
          console.error('Error getting movie:', err.error.message);
          this.router.navigate(['/manager-home/products']);
        }
      })
    }
  }

  saveProduct() {
    if(this.isEditMode) {
      if(this.productId) {
        this.productService.updateProduct(this.productId, this.productsForm.value).subscribe({
          next: (response) => {
            console.log(response.data);
            this.errorMessage = null;
            this.router.navigate(['/manager-home/products'])
          },
          error: (err) => {
            this.errorMessage = 'Ocurrio un error al actualizar el producto.'
            console.error('Error updating movie:', err.error.message);
          }
        })
      }
    } else {
      this.productService.addProduct(this.productsForm.value).subscribe({
        next: (response) => {
            console.log(response.data);
            this.errorMessage = null;
            this.router.navigate(['/manager-home/products'])
          },
          error: (err) => {
            this.errorMessage = 'Ocurrio un error guardar el producto.'
            console.error('Error saving product:', err.error.message);
          }
      })
    }
  }

  deleteProduct() {
    if(this.productId) {
      this.productService.deleteProduct(this.productId).subscribe({
        next: (response) => {
          this.errorMessage = null;
          this.router.navigate(['/manager-home/products'])
        },
        error: (err) => {
          this.errorMessage = 'Ocurrio un error al eliminar el producto.'
          console.error('Error deleting product:', err.error.message);
        }
      })
    }
  }

}
