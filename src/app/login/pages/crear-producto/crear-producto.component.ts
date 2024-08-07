// src/app/components/crear-producto/crear-producto.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service'; 
import { MarcaService } from '../../services/marca.service';
import { Router } from '@angular/router';
import { HttpUrlEncodingCodec } from '@angular/common/http';

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
      file: ['', Validators.required],
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
  
      console.log('FormData:', formData); // Verificar datos
  
      this.productoService.crearProducto(formData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/user/listar-producto']);
          this.showAlert('Producto creado con exito', 'alert-success');
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
