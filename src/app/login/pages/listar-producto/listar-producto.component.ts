import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../interfaces/producto.interface';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { Router } from '@angular/router';

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
  isImageValid: boolean = true;
  isPriceValid: boolean = true;
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
      precio: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      existencias: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
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
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

      if (!validImageTypes.includes(file.type)) {
        this.isImageValid = false;
        this.selectedFile = null;
        fileInput.value = ''; // Restablece el input de archivo
        this.showAlert('El archivo seleccionado no es una imagen válida', 'alert-danger');
      } else {
        this.isImageValid = true;
        this.selectedFile = file;
      }
    }
  }

  validatePrice(): void {
    const priceValue = this.editarForm.get('precio')?.value;
    if (priceValue < 0) {
      this.isPriceValid = false;
      this.showAlert('El precio no puede ser negativo.', 'alert-danger');
    } else {
      this.isPriceValid = true;
    }
  }

  guardarProducto(): void {
    if (this.editarForm.valid && this.isImageValid && this.isPriceValid) {
      const formData = new FormData();
      formData.append('producto', this.editarForm.get('producto')?.value);
      formData.append('categoria', this.editarForm.get('categoria')?.value);
      formData.append('marca', this.editarForm.get('marca')?.value);
      formData.append('descripcion', this.editarForm.get('descripcion')?.value);
      formData.append('precio', this.editarForm.get('precio')?.value);
      formData.append('existencias', this.editarForm.get('existencias')?.value);
  
      // Verificar si se seleccionó una imagen
      if (this.selectedFile) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(this.selectedFile.type)) {
          this.showAlert('Por favor, seleccione un archivo de imagen válido (jpg, jpeg, png, gif).', 'alert-danger');
          return;
        }
        formData.append('file', this.selectedFile);
      }
  
      if (this.productoSeleccionado) {
        this.productoService.actualizarProducto(this.productoSeleccionado.id, formData).subscribe(
          () => {
            this.showAlert('Producto actualizado correctamente', 'alert-success');
            this.obtenerProductos();
            this.closeModal();  // Llama al método para cerrar el modal
          },
          (error) => {
            console.error('Error al actualizar producto:', error);
            this.showAlert('Error al actualizar producto', 'alert-danger');
          }
        );
      }
    }
  }
  
  closeModal(): void {
    const modalElement = document.getElementById('editarProductoModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.hide();
    }
  }

  regresar(): void {
    this.router.navigate(['/admin/listar-producto']);
  }

  showAlert(message: string, alertClass: string) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} fixed-top d-flex align-items-center justify-content-center`;
    alertDiv.textContent = message;
    alertDiv.style.fontSize = '20px';

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.remove();
    }, 3000); // Tiempo extendido para que el usuario pueda leer el mensaje
  }

  preventNegative(event: KeyboardEvent): void {
    if (event.key === '-' || event.key === '+' || event.key === 'e') {
      event.preventDefault();
    }
  }

  validateNumberInput(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);

    // Permitir solo números y evitar negativos, signos positivos y 'e'
    if (!/^\d$/.test(charStr)) {
      event.preventDefault();
    }
  }
}
