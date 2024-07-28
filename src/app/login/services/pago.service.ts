import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app';

  constructor(private http: HttpClient) {}
procesarPago() {
  this.http.post('/api/carrito/procesar-pago', {}).subscribe((response: any) => {
    const orderId = response.orderId;

    // Redirige al usuario a PayPal para completar el pago en modo live
    window.location.href = `https://www.paypal.com/checkoutnow?token=${orderId}`;
  });
}

capturarPago(orderId: string) {
  this.http.post('/api/carrito/capturar-pago', { orderId }).subscribe((response: any) => {
    console.log('Pago capturado exitosamente', response);
    // Aquí puedes mostrar un mensaje de éxito o redirigir al usuario
  });
}


  enviarConfirmacion(items: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/carrito/enviar-confirmacion`, { items });
  }
  
}
