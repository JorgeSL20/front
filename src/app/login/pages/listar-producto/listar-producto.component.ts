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
  errorMessage: string | null = null;

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
      precio: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],  // Solo números y punto decimal
      existencias: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Solo números enteros
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
  
      // Muestra la imagen actual en el modal
      const imageUrl = producto.url; // URL de la imagen actual
      const imageElement = document.getElementById('currentImage');
      if (imageElement) {
        (imageElement as HTMLImageElement).src = imageUrl || '';
      }
  
      // Limpiar el campo de archivo
      const fileInput = document.getElementById('editarFile') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
  
      // Muestra el modal
      const modalElement = document.getElementById('editarProductoModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Verificar el tipo de archivo
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validTypes.includes(file.type)) {
        this.selectedFile = file;
        this.errorMessage = null; // Limpiar el mensaje de error si el archivo es válido
      } else {
        this.selectedFile = null; // Reestablecer el archivo seleccionado si no es válido
        this.errorMessage = 'Por favor, seleccione un archivo de imagen válido (jpg, jpeg, png).';
      }
    }
  }

  guardarProducto(): void {
    // Verificar si el formulario es válido
    if (this.editarForm.invalid) {
      let mensaje = '';
      if (!this.editarForm.get('producto')?.value) {
        mensaje += 'El campo Producto es obligatorio. ';
      }
      if (!this.editarForm.get('categoria')?.value) {
        mensaje += 'El campo Categoría es obligatorio. ';
      }
      if (!this.editarForm.get('marca')?.value) {
        mensaje += 'El campo Marca es obligatorio. ';
      }
      if (!this.editarForm.get('descripcion')?.value) {
        mensaje += 'El campo Descripción es obligatorio. ';
      }
      if (!this.editarForm.get('precio')?.value || isNaN(this.editarForm.get('precio')?.value)) {
        mensaje += 'El campo Precio debe ser un número válido. ';
      }
      if (!this.editarForm.get('existencias')?.value || isNaN(this.editarForm.get('existencias')?.value)) {
        mensaje += 'El campo Existencias debe ser un número entero válido. ';
      }
      if (mensaje) {
        this.showAlert(mensaje, 'alert-danger');
        return;
      }
    }

    const formData = new FormData();
    formData.append('producto', this.editarForm.get('producto')?.value);
    formData.append('categoria', this.editarForm.get('categoria')?.value);
    formData.append('marca', this.editarForm.get('marca')?.value);
    formData.append('descripcion', this.editarForm.get('descripcion')?.value);
    formData.append('precio', this.editarForm.get('precio')?.value);
    formData.append('existencias', this.editarForm.get('existencias')?.value);

    // Verificar si se seleccionó una imagen
    if (this.selectedFile) {
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(this.selectedFile.type)) {
        this.showAlert('Por favor, seleccione un archivo de imagen válido (jpg, jpeg, png).', 'alert-danger');
        return;
      }
      formData.append('file', this.selectedFile);
    }

    if (this.productoSeleccionado) {
      this.productoService.actualizarProducto(this.productoSeleccionado.id, formData).subscribe(
        () => {
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
          this.showAlert('Error al actualizar producto', 'alert-danger');
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
    }, 3000); // Aumenta el tiempo para dar más tiempo al usuario a leer el mensaje
  }
}