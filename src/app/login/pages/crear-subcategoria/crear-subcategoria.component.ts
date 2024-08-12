import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-subcategoria',
  templateUrl: './crear-subcategoria.component.html',
  styleUrls: ['./crear-subcategoria.component.css']
})
export class CrearSubcategoriaComponent {
  myForm: FormGroup;
  categorias: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private SubcategoriaService: SubcategoriaService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      categoria: ['', Validators.required,Validators.pattern('^[A-Za-z\\s]+$')],
      subcategoria: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  guardarSubcategoria() {
    if (this.myForm.invalid) {
      return;
    }
  
    const subcategoriaData = this.myForm.value;
    const categoriaSeleccionada = subcategoriaData.categoria.trim().toLowerCase();
    const subcategoriaNueva = subcategoriaData.subcategoria.trim().toLowerCase();
  
    // Verifica si la subcategoría ya existe en la categoría seleccionada
    this.SubcategoriaService.obtenerSubcategoria().subscribe(
      (subcategorias: any[]) => {
        const subcategoriaDuplicada = subcategorias.some(subcategoria =>
          subcategoria.categoria.trim().toLowerCase() === categoriaSeleccionada &&
          subcategoria.subcategoria.trim().toLowerCase() === subcategoriaNueva
        );
  
        if (subcategoriaDuplicada) {
          this.showAlert('Esta subcategoría ya existe en la categoría seleccionada', 'alert-danger');
          return;
        }
  
        // Si no hay duplicados, crear la subcategoría
        this.SubcategoriaService.crearSubcategoria(subcategoriaData).subscribe(
          response => {
            console.log(response);
            this.router.navigate(['/admin/listar-subcategoria']);
            this.showAlert('Subcategoría creada con éxito', 'alert-success');
          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error('Error al obtener subcategorías:', error);
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

  regresar() {
    this.router.navigate(['/admin/listar-subcategoria']);
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
