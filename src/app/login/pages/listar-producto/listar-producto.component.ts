import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private router: Router, @Inject(ProductoService) private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        console.log(this.productos); // Puedes hacer lo que necesites con los productos
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(
        () => {
          console.log('Producto eliminado correctamente');
          // Volver a cargar los productos después de eliminar
          this.obtenerProductos();
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
        }
      );
    }
  }

  

  irAFormulario(): void {
    this.router.navigate(['/user/crear-producto']);
  }
}
