import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
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
  isExistenciasValid: boolean = true;
  errorMessage: string | null = null;

  // Paginación
  paginaActual: number = 1;
  productosPorPagina: number = 10;
  productosPaginados: Producto[] = [];
  totalPaginas: number = 0;

  @ViewChild('productosTable') productosTable!: ElementRef;

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
      cantidadMay: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      precioMen: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      precioMay: ['', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
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
        // Ordenar los productos por fecha de creación, de más nuevo a más viejo
        this.productos = productos.sort((a, b) => {
          const fechaA = a.fechaCreacion ? new Date(a.fechaCreacion) : new Date(0);
          const fechaB = b.fechaCreacion ? new Date(b.fechaCreacion) : new Date(0);
          return fechaB.getTime() - fechaA.getTime(); // Ordenar de más nuevo a más viejo
        });

        this.totalPaginas = Math.ceil(this.productos.length / this.productosPorPagina);
        this.cambiarPagina(1); // Cargar la primera página
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas) {
      return;
    }
    this.paginaActual = pagina;
    const inicio = (pagina - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    this.productosPaginados = this.productos.slice(inicio, fin);
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
          this.router.navigate(['/admin/listar-producto']);
        }
      );
    }
  }

  toggleEditForm(producto: Producto | null): void {
    if (producto) {
      this.editarForm.patchValue({
        producto:  producto.producto,
        categoria: producto.categoria,
        marca: producto.marca,
        descripcion: producto.descripcion,
        cantidadMay: producto.cantidadMay,
        precioMen: producto.precioMen,
        precioMay: producto.precioMay,
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

  validatePriceMen(): void {
    const priceValue = this.editarForm.get('precioMen')?.value;
    if (priceValue < 0) {
      this.isPriceValid = false;
      this.showAlert('El precio por menudeo no puede ser negativo.', 'alert-danger');
    } else {
      this.isPriceValid = true;
    }
  }

  validatePriceMay(): void {
    const priceValue = this.editarForm.get('precioMay')?.value;
    if (priceValue < 0) {
      this.isPriceValid = false;
      this.showAlert('El precio por mayoreo no puede ser negativo.', 'alert-danger');
    } else {
      this.isPriceValid = true;
    }
  }

  validateCantidad(): void {
    const priceValue = this.editarForm.get('cantidadMay')?.value;
    if (priceValue < 0) {
      this.isPriceValid = false;
      this.showAlert('La cantidad no puede ser negativo.', 'alert-danger');
    } else {
      this.isPriceValid = true;
    }
  }

  validateExistencias(): void {
    const exisValue = this.editarForm.get('existencias')?.value;
    if (exisValue < 0) {
      this.isExistenciasValid = false;
      this.showAlert('Las existencias no puede ser negativo.', 'alert-danger');
    } else {
      this.isExistenciasValid = true;
    }
  }

  guardarProducto(): void {
    if (this.editarForm.valid && this.isImageValid && this.isPriceValid) {
      if (this.productoSeleccionado) {
        const formData = new FormData();
        formData.append('producto', this.editarForm.get('producto')?.value);
        formData.append('categoria', this.editarForm.get('categoria')?.value);
        formData.append('marca', this.editarForm.get('marca')?.value);
        formData.append('descripcion', this.editarForm.get('descripcion')?.value);
        formData.append('cantidadMay', this.editarForm.get('cantidadMay')?.value);
        formData.append('precioMen', this.editarForm.get('precioMen')?.value);
        formData.append('precioMay', this.editarForm.get('precioMay')?.value);
        formData.append('existencias', this.editarForm.get('existencias')?.value);
    
        if (this.selectedFile) {
          formData.append('file', this.selectedFile);
        }
    
        this.productoService.actualizarProducto(this.productoSeleccionado.id, formData).subscribe(
          () => {
            console.log('Producto actualizado correctamente');
            this.showAlert('Producto actualizado correctamente.', 'alert-success');
            this.obtenerProductos(); // Recargar productos para actualizar la lista
            this.editarForm.reset();
            this.selectedFile = null;
            this.isImageValid = true;
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
      } else {
        this.showAlert('No se ha seleccionado un producto para editar.', 'alert-danger');
      }
    } else {
      this.showAlert('Por favor, corrija los errores en el formulario.', 'alert-danger');
    }
  }
  

  scrollToNewProduct(productId: number): void {
    setTimeout(() => {
      const productoElement = document.getElementById(`producto-${productId}`);
      if (productoElement) {
        productoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Ajustar el tiempo si es necesario
  }

  showAlert(message: string, type: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000); // Ocultar el mensaje después de 5 segundos
  }
  validateNumberInput(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);

    // Permitir solo números positivos y 'e'
    if (!/^\d$/.test(charStr) && charStr !== 'e') {
      event.preventDefault();
    }
  }
}
