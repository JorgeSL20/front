import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrls: ['./producto-detalles.component.css']
})
export class ProductoDetallesComponent {
  @Input() producto!: Producto;
  @Output() close = new EventEmitter<void>();

  constructor(private carritoService: CarritoService) {}

  closeModal() {
    this.close.emit();
  }

  agregarAlCarrito(productoId: number | undefined): void {
    if (productoId === undefined) {
      console.error('El id del producto es undefined');
      return;
    }
    const cantidad = 1;
    const item = {
      productoId: productoId,
      cantidad: cantidad
    };

    this.carritoService.agregarOActualizarItem(item).subscribe(
      response => {
        console.log('Producto agregado o actualizado en el carrito:', response);
        this.showAlert('Producto agregado', 'alert-success');
      },
      error => {
        console.error('Error al agregar producto al carrito:', error);
      }
    );
  }
  showAlert(message: string, alertClass: string) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} fixed-top d-flex align-items-center justify-content-center`;
    alertDiv.textContent = message;
    alertDiv.style.fontSize = '20px';

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  }
}
