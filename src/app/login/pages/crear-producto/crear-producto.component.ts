// src/app/components/crear-producto/crear-producto.component.ts
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
  categorias: any[] = [];
  marcas: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
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

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  guardarProducto() {
    if (this.myForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('producto', this.myForm.get('producto')?.value);
      formData.append('categoria', this.myForm.get('categoria')?.value);
      formData.append('marca', this.myForm.get('marca')?.value);
      formData.append('descripcion', this.myForm.get('descripcion')?.value);
      formData.append('precio', this.myForm.get('precio')?.value);
      formData.append('existencias', this.myForm.get('existencias')?.value);
  
      console.log('FormData:', formData); // Log para verificar datos
  
      this.productoService.crearProducto(formData).subscribe(
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
