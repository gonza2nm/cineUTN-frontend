import { Component } from '@angular/core';
import { buyDataSend, Snack } from '../interfaces/interfaces.js';
import { ProductsService } from '../products/products.service';
import { BuyService } from '../buy/buy.service';

@Component({
  selector: 'app-buy-snacks',
  templateUrl: './buy-snacks.component.html',
  styleUrls: ['./buy-snacks.component.css']
})
export class BuySnacksComponent {
  
  snacks: Snack[] = [];
  message = '';
  buyDataSend: buyDataSend = {
    description: '',
    total: 0,
    fechaHora: new Date(),
    user: 0,
    status: '',
    cantElements: 0,
    snacks: []
  }

  constructor(
    private producsService: ProductsService,
    private buyService: BuyService
  ) {}


  ngOnInit() {
    this.loadSnacks();
  }

  loadSnacks() {
    this.producsService.getAllProducts().subscribe({
      next: (response) => {
        this.snacks = response.data;
      }, 

      error: (err) => {
        console.log(err.error)
      }
    })
  }

  confirmPurchase() {
    
    this.message = 'Compra hecha.'
    this.buyService.addBuy
  }
}
