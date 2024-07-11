import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service'; 
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductosComponent implements OnInit {
  productos: Producto[] = [];
  categorias: any[] = [];
  marcas: any[] = [];

  constructor(
    private router: Router,
    @Inject(ProductoService) private productoService: ProductoService,
    @Inject(MarcaService) private marcaService: MarcaService,
    @Inject(CategoriaService) private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.categoriaService.obtenerCategoria().subscribe(
      (categorias: any[]) => {
        this.categorias = categorias;
        this.marcaService.obtenerMarca().subscribe(
          (marcas: any[]) => {
            this.marcas = marcas;
            this.obtenerProductos();
          },
          (error) => {
            console.error('Error al obtener marcas:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
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
