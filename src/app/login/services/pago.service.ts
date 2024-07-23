// src/app/services/pago.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient) { }

  procesarPago(items: any[], total: number): Observable<any> {
    // Implementar la llamada al servicio de pago (Stripe, PayPal, etc.)
    const pagoData = { items, total };
    return this.http.post('/api/pago', pagoData);
  }

  enviarConfirmacion(items: any[]): Observable<any> {
    // Implementar la lógica para enviar el correo de confirmación
    return this.http.post('/api/enviar-confirmacion', { items });
  }
}
