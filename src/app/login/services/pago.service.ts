import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app/pago';

  constructor(private http: HttpClient) {}

  procesarPago(pagoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/procesar-pago`, pagoData);
  }

  enviarConfirmacion(items: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviar-confirmacion`, { items });
  }

  capturarPago(orderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/capturar-pago`, { orderId });
  }
}
