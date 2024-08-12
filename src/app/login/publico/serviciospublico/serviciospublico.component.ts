import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-serviciospublico',
  templateUrl: './serviciospublico.component.html',
  styleUrls: ['./serviciospublico.component.css']
})
export class ServiciospublicoComponent implements OnInit {
  productos: Producto[] = [];
  categorias: any[] = [];
  marcas: any[] = [];
  terminoBusqueda: string = '';
  productosFiltrados: Producto[] = [];
  productoSeleccionado: Producto | null = null;

  constructor(
    private el: ElementRef,
    private router: Router,
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.cargarDatosIniciales();
    // Agregar visibilidad al cargar la página
    this.checkVisibility();
  }

  cargarDatosIniciales(): void {
    this.categoriaService.obtenerCategoria().subscribe(
      (categorias: any[]) => {
        console.log('Categorías recibidas:', categorias); // Verificar datos
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
        this.productosFiltrados = productos; // Inicializa los productos filtrados
        // Asegurarse de que los productos sean visibles después de la carga
        setTimeout(() => this.checkVisibility(), 100); // Esperar para aplicar la visibilidad
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  buscar(): void {
    const termino = this.terminoBusqueda.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto =>
      producto.producto.toLowerCase().includes(termino) ||
      producto.categoria.toLowerCase().includes(termino) ||
      producto.marca.toLowerCase().includes(termino) ||
      producto.descripcion.toLowerCase().includes(termino)
    );
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
        this.showAlert('Producto agregado al carrito', 'alert-success');
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

  abrirModal(producto: Producto) {
    this.productoSeleccionado = producto;
    document.body.style.overflow = 'hidden'; // Evitar el scroll del fondo
  }

  cerrarModal() {
    this.productoSeleccionado = null;
    document.body.style.overflow = 'auto'; // Restaurar el scroll del fondo
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    const cards = this.el.nativeElement.querySelectorAll('.card');
    cards.forEach((card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        card.classList.add('visible');
      } else {
        card.classList.remove('visible');
      }
    });
  }
}
