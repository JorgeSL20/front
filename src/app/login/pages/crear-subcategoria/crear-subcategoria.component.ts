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
      categoria: ['', Validators.required],
      subcategoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  guardarSubcategoria() {
    if (this.myForm.valid) {
      const subcategoriaData = this.myForm.value;
      this.SubcategoriaService.crearSubcategoria(subcategoriaData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin/listar-subcategoria']);
          this.showAlert('Subcategoria Creada con exito', 'alert-success');
        },
        error => {
          console.error(error);
        }
      );
    }
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
    this.router.navigate(['/user/listar-subcategoria']);
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
