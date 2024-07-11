import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service'; 
import { MarcaService } from '../../services/marca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  myForm: FormGroup;
  categorias: any[] = []; // Propiedad para almacenar las categorías
  marcas: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService, // Inyecta CategoriaService
    private marcaService: MarcaService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      imagenP: ['', Validators.required],
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      existencias: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerMarcas();
  }

  obtenerMarcas(): void {
    this.marcaService.obtenerMarca().subscribe(
      (marcas: any[]) => {
        this.marcas = marcas;
      },
      (error) => {
        console.error('Error al obtener marcas:', error);
      }
    );
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategoria().subscribe(
      (categorias: any[]) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  guardarProducto() {
    if (this.myForm.valid) {
      const productoData = this.myForm.value;
      this.productoService.crearProducto(productoData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/user/listar-producto']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  regresar() {
    this.router.navigate(['/user/listar-producto']);
  }
}
