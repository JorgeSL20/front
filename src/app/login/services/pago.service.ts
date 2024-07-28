import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app';

  constructor(private http: HttpClient) {}

  procesarPago(total: number, items: any[]): Observable<any> {
    const pagoData = { total, items };
    return this.http.post(`${this.apiUrl}/carrito/procesar-pago`, pagoData);
  }

  enviarConfirmacion(items: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito/enviar-confirmacion`, { items });
  }
}
