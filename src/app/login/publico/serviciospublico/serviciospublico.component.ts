import { Component, OnInit, ElementRef, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service'; 
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-serviciospublico',
  templateUrl: './serviciospublico.component.html',
  styleUrls: ['./serviciospublico.component.css']
})
export class ServiciospublicoComponent implements OnInit {
  productos: Producto[] = [];
  categorias: any[] = [];
  marcas: any[] = [];

  constructor(
    private el: ElementRef,
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



  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const cards = this.el.nativeElement.querySelectorAll('.card');
    cards.forEach((card: HTMLElement) => {  // Agrega el tipo HTMLElement
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        card.classList.add('visible');
      } else {
        card.classList.remove('visible');
      }
    });
  }
}
