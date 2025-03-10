import { Component, OnDestroy, OnInit } from '@angular/core';
import { BuyService } from '../buy/buy.service';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { Buy } from '../interfaces/buy.interface.js';

@Component({
  selector: 'app-buy-validate-qr',
  templateUrl: './buy-validate-qr.component.html',
  styleUrls: ['./buy-validate-qr.component.css']
})
export class BuyValidateQrComponent implements OnDestroy {

  errorMessage: string | null = null;
  buyData: Buy = {
    id: 0,
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
    tickets: [],
    snacksBuy: [],
    promotionsBuy: [],

  }

  pressOnce: boolean = false; // Para que el boton solo pueda apretarse una vez.
  private scannerControls: IScannerControls | null = null;

  constructor(private buyService: BuyService) { }

  scanQRCode() {
    const codeReader = new BrowserQRCodeReader(); //viene de @zxing/browser
    this.pressOnce = true;

    codeReader.decodeFromVideoDevice(undefined, 'video',
      (result, error, controls) => {
        if (controls) {
          this.scannerControls = controls; //guardamos los controles para poder detener la camara luego
        }
        if (result) {
          const token = result.getText(); // consigue el texto del qr
          this.validateQRCode(token); // Valida el QR con el backend
        }
        if (error) {
          this.errorMessage = 'No se detecta el QR. Intenta enfocarlo mejor.';
        }
      }
    )
  }

  validateQRCode(token: string) {
    this.buyService.validateQRCode(token).subscribe({
      next: (response) => {
        this.buyData = response.data;
        this.errorMessage = null;
        this.scrollToDetails()
      },
      error: (error) => {
        this.errorMessage = 'El QR no es válido o ha expirado. Intente recargando el detalle de la compra';
        console.error('Error validating QR:', error);
        this.scrollToDetails()
      },
    });
  }

  ngOnDestroy() { //mata la camara cuando salismos del componente
    if (this.scannerControls) {
      this.scannerControls.stop(); // detenemos la camara
    }
  }

  scrollToDetails() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
}
