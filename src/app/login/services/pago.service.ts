import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app/pago';
  private scriptLoaded = false;

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

  loadPayPalScript(clientId: string, currency: string): Promise<void> {
    if (this.scriptLoaded) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load PayPal script'));
      document.body.appendChild(script);
    });
  }
}
