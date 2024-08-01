import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito.service';
import { LoginService } from '../../services/login.service'; // Importa el LoginService

@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrls: ['./producto-detalles.component.css']
})
export class ProductoDetallesComponent implements OnInit {
  @Input() producto!: Producto;
  @Output() close = new EventEmitter<void>();
  isLoggedIn: boolean = false; // Variable para almacenar el estado de autenticación

  constructor(
    private carritoService: CarritoService,
    private loginService: LoginService // Inyecta el LoginService
  ) {}

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn; 
    });
  }

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
        this.showAlert('Error al agregar producto al carrito', 'alert-danger');
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
