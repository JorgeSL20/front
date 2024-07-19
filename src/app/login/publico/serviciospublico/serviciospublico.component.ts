import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { CarritoService } from '../../services/carrito.service'; // Importa el servicio de carrito
import { AuthService } from '../../services/auth.service'; // Importa el AuthService

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

  constructor(
    private el: ElementRef,
    private router: Router,
    private productoService: ProductoService,
    private marcaService: MarcaService,
    private categoriaService: CategoriaService,
    private carritoService: CarritoService, // Inyecta el servicio de carrito
    private authService: AuthService // Inyecta el AuthService
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
        this.productosFiltrados = productos; // Inicializa los productos filtrados
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

  agregarAlCarrito(productoId: number): void {
    const usuarioId = this.authService.getCurrentUserId(); // Obtén el ID del usuario del servicio de autenticación
    const cantidad = 1; // Ajusta según tus necesidades

    if (usuarioId !== null) {
      this.carritoService.agregarItem(productoId, cantidad).subscribe(
        response => {
          console.log('Producto agregado al carrito:', response);
          // Puedes mostrar una notificación o realizar acciones adicionales aquí si es necesario
        },
        error => {
          console.error('Error al agregar producto al carrito:', error);
          // Puedes manejar el error aquí
        }
      );
    } else {
      console.error('Usuario no autenticado');
      // Maneja el caso cuando el usuario no está autenticado
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
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
