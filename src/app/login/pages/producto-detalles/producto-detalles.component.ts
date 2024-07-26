// src/app/producto-detalles/producto-detalles.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-producto-detalles',
  templateUrl: './producto-detalles.component.html',
  styleUrls: ['./producto-detalles.component.css']
})
export class ProductoDetallesComponent {
  @Input() producto!: Producto;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
