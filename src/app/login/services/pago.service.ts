// src/app/services/pago.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://localhost:3000/pago';

  constructor(private http: HttpClient) { }

  procesarPago(pagoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/procesar-pago`, pagoData);
  }

  capturarPago(orderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/capturar-pago`, { orderId });
  }
}
