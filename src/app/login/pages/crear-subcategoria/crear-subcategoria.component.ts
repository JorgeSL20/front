// components/crear-subcategoria.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-subcategoria',
  templateUrl: './crear-subcategoria.component.html',
  styleUrls: ['./crear-subcategoria.component.css']
})
export class CrearSubcategoriaComponent implements OnInit {
  myForm: FormGroup;
  categorias: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private subcategoriaService: SubcategoriaService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      categoria: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
      subcategoria: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]]
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  guardarSubcategoria() {
    if (this.myForm.valid) {
      const subcategoriaData = this.myForm.value;
      this.subcategoriaService.crearSubcategoria(subcategoriaData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin/listar-subcategoria']);
          this.showAlert('Subcategoría creada con éxito', 'alert-success');
        },
        error => {
          if (error.status === 400) { // Manejo del error 400
            this.showAlert('La subcategoría ya existe', 'alert-danger');
          } else {
            console.error(error);
          }
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
