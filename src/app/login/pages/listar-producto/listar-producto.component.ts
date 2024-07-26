import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  productoSeleccionado: Producto | null = null;
  editarForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    @Inject(ProductoService) private productoService: ProductoService,
    @Inject(MarcaService) private marcaService: MarcaService,
    @Inject(CategoriaService) private categoriaService: CategoriaService,
    private formBuilder: FormBuilder
  ) {
    this.editarForm = this.formBuilder.group({
      file: [''],
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      existencias: ['', Validators.required],
    });
  }

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

  actualizarExistencias(producto: Producto): void {
    const formData = new FormData();
    formData.append('existencias', producto.existencias.toString());

    this.productoService.actualizarProducto(producto.id, formData).subscribe(
      () => {
        console.log('Existencias actualizadas correctamente');
        this.showAlert('Existencias actualizadas correctamente', 'alert-success');
      },
      (error) => {
        console.error('Error al actualizar existencias:', error);
        this.showAlert('Error al actualizar existencias', 'alert-danger');
      }
    );
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(
        () => {
          console.log('Producto eliminado correctamente');
          this.obtenerProductos();
          this.showAlert('Producto eliminado correctamente', 'alert-success');

        },
        (error) => {
          console.error('Error al eliminar producto:', error);
          this.showAlert('Error al eliminar producto', 'alert-danger');
        }
      );
    }
  }

  toggleEditForm(producto: Producto | null): void {
    if (producto) {
      this.editarForm.patchValue({
        producto: producto.producto,
        categoria: producto.categoria,
        marca: producto.marca,
        descripcion: producto.descripcion,
        precio: producto.precio,
        existencias: producto.existencias,
      });
      this.productoSeleccionado = producto;

      // Muestra el modal
      const modalElement = document.getElementById('editarProductoModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }



  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  guardarProducto(): void {
    if (this.editarForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('producto', this.editarForm.get('producto')?.value);
    formData.append('categoria', this.editarForm.get('categoria')?.value);
    formData.append('marca', this.editarForm.get('marca')?.value);
    formData.append('descripcion', this.editarForm.get('descripcion')?.value);
    formData.append('precio', this.editarForm.get('precio')?.value);
    formData.append('existencias', this.editarForm.get('existencias')?.value);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    if (this.productoSeleccionado) {
      this.productoService.actualizarProducto(this.productoSeleccionado.id, formData).subscribe(
        () => {
          console.log('Producto actualizado correctamente');
          this.showAlert('Producto actualizado correctamente', 'alert-success');
          this.obtenerProductos();
          const modalElement = document.getElementById('editarProductoModal');
          if (modalElement) {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.hide();
          }
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    }
  }

  showAlert(message: string, alertClass: string) {
    // Crea un div para el mensaje
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} fixed-top d-flex align-items-center justify-content-center`;
    alertDiv.textContent = message;
    alertDiv.style.fontSize = '20px'; // Cambia el tamaño del texto

    // Agrega el mensaje al cuerpo del documento
    document.body.appendChild(alertDiv);

    // Elimina el mensaje después de unos segundos
    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  
}
}
