import { Component, OnInit } from '@angular/core';
import { Buy } from '../interfaces/interfaces.js';
import { BuyService } from '../buy/buy.service';
import { BrowserQRCodeReader } from '@zxing/browser';

@Component({
  selector: 'app-buy-validate-qr',
  templateUrl: './buy-validate-qr.component.html',
  styleUrls: ['./buy-validate-qr.component.css']
})
export class BuyValidateQrComponent {

  errorMessage: string | null = null;
  buyData: Buy = {
    id: 0,
    description: '',
    total: 0,
    fechaHora: new Date(),
    user: {
      id: 0,
      dni: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      type: 'user',
      buys: []
    },
    status: '',
    tickets: []

  }

  constructor(private buyService: BuyService) { }

  scanQRCode() {
    const codeReader = new BrowserQRCodeReader(); //viene de @zxing/browser

    codeReader.decodeFromVideoDevice(undefined, 'video',
      (result, error) => {
        if (result) {
          const token = result.getText(); // consigue el texto del qr
          this.validateQRCode(token); // Valida el QR con el backend
        }
        if (error) {
          this.errorMessage = 'No se pudo leer el QR. Intenta nuevamente.';
          console.error('Error scanning QR code:', error);
        }
      }
    )
  }

  validateQRCode(token: string) {
    this.buyService.validateQRCode(token).subscribe({
      next: (response) => {
        this.buyData = response.data;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'El QR no es válido o ha expirado.';
        console.error('Error al validar el QR:', error);
      },
    });
  }
}
