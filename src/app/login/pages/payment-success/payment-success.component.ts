// src/app/components/payment-success/payment-success.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagoService } from '../../services/pago.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.queryParamMap.get('token');
    if (orderId) {
      this.pagoService.capturarPago(orderId).subscribe(
        (response) => {
          console.log('Pago capturado:', response);
          // Mostrar mensaje de éxito al usuario
        },
        (error) => {
          console.error('Error al capturar el pago:', error);
          // Mostrar mensaje de error al usuario
        }
      );
    }
  }
}
