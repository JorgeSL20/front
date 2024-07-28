import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  items: any[] = [];
  total: number = 0;
  userEmail: string | null = null;

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private http: HttpClient
    
  ) { }

  ngOnInit(): void {
    this.carritoService.obtenerItemsDelCarrito().subscribe(items => {
      this.items = items;
      this.total = this.items.reduce((acc, item) => acc + (item.productoPrecio * item.cantidad), 0);
      this.initializePayPalButton();
    });

    this.authService.getCurrentUserEmail().subscribe(email => {
      this.userEmail = email;
    });
  }

  createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: this.total.toFixed(2),
          currency_code: 'MXN'
        }
      }]
    });
  }

  onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      await this.carritoService.procesarPago(this.total, this.items).toPromise();
      await this.carritoService.enviarConfirmacion(this.items).toPromise();
      alert('Pago completado con éxito.');
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert(`Error al completar el pago: ${error}`);
    }
  }

  initializePayPalButton() {
    loadScript({
      clientId: environment.paypalClientId,
      currency: 'MXN',
      locale: 'es_MX'
    }).then((paypal: PayPalNamespace | null) => {
      if (paypal && paypal.Buttons) {
        paypal.Buttons({
          createOrder: this.createOrder,
          onApprove: this.onApprove,
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal'
          }
        }).render('#paypal-button-container');
      } else {
        console.error('PayPal SDK no se pudo cargar.');
      }
    }).catch((error: any) => {
      console.error('No se pudo cargar el script de PayPal JS SDK', error);
    });
  } 

  procesarPago(pagoData: any) {
    this.http.post('https://proyectogatewayback-production.up.railway.app/carrito/enviar-confirmacion', pagoData)
      .toPromise()
      .then(response => {
        console.log('Pago procesado exitosamente:', response);
      })
      .catch(error => {
        console.error('Error al procesar el pago:', error);
      });
  }
  
}
