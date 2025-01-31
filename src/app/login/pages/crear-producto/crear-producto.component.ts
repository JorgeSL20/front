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
  isImageValid: boolean = true;
  isPriceValid: boolean = true;

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
      cantidadMay: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      precioMen: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      precioMay: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      existencias: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
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
    const fileInput = event.target;
    const file = fileInput.files[0];
  
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
      if (!validImageTypes.includes(file.type)) {
        this.isImageValid = false;
        this.selectedFile = null;
        fileInput.value = '';  // Restablece el input de archivo
        this.showAlert('El archivo seleccionado no es una imagen válida', 'alert-danger');
      } else {
        this.isImageValid = true;
        this.selectedFile = file;
      }
    }
  }
  
  validatePrice(): void {
    const priceValue = this.myForm.get('precio')?.value;
    if (priceValue < 0) {
      this.isPriceValid = false;
      alert('El precio no puede ser negativo.');
    } else {
      this.isPriceValid = true;
    }
  }

  guardarProducto() {
    if (this.myForm.valid && this.isImageValid && this.isPriceValid) {
      const formData = new FormData();
      formData.append('file', this.selectedFile as Blob);
      formData.append('producto', this.myForm.get('producto')?.value);
      formData.append('categoria', this.myForm.get('categoria')?.value);
      formData.append('marca', this.myForm.get('marca')?.value);
      formData.append('descripcion', this.myForm.get('descripcion')?.value);
      formData.append('cantidadMay', this.myForm.get('cantidadMay')?.value);
      formData.append('precioMen', this.myForm.get('precioMen')?.value);
      formData.append('precioMay', this.myForm.get('precioMay')?.value);
      formData.append('existencias', this.myForm.get('existencias')?.value);
  
      console.log('FormData:', formData); // Verificar datos
  
      this.productoService.crearProducto(formData).subscribe(
        response => {
          console.log(response);
          this.showAlert('Producto creado con éxito', 'alert-success');
          this.router.navigate(['/admin/listar-producto'], { queryParams: { nuevoProductoId: response.id } });
        },
        error => {
          console.error('Error al crear producto:', error);

          // Manejo de errores por código de estado
          if (error.status === 409) {
            this.showAlert('El producto ya existe o hay un conflicto.', 'alert-danger');
          } else if (error.status === 400) {
            this.showAlert('Datos inválidos. Por favor verifica el formulario.', 'alert-danger');
          } else {
            this.showAlert('Hubo un problema al crear el producto. Inténtalo de nuevo.', 'alert-danger');
          }
        }
      );
    }
  }

  regresar() {
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
    }, 2000);
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
