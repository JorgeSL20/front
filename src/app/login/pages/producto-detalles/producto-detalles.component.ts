import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrls: ['./producto-detalles.component.css']
})
export class ProductoDetallesComponent {
  @Input() producto!: Producto; // Recibe el producto como entrada

  constructor(public activeModal: NgbActiveModal) {}

  // Método para cerrar el modal
  closeModal(): void {
    this.activeModal.close();
  }
}
