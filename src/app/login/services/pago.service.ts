// src/app/login/services/pago.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  crearOrden(pagoData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/pago/crear-orden`, pagoData, { headers });
  }

  capturarPago(orderId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/pago/capturar-pago`, { orderId }, { headers });
  }

  enviarConfirmacion(items: any[]): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return new Observable(observer => {
      this.authService.getCurrentUserEmail().subscribe(email => {
        if (email) {
          this.http.post(`${this.apiUrl}/soporte/send-email`, { items, email }, { headers })
            .subscribe(
              response => {
                observer.next(response);
                observer.complete();
              },
              error => {
                observer.error(error);
              }
            );
        } else {
          observer.error('No email found');
        }
      });
    });
  }
}
