import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { Subcategoria } from '../../interfaces/subcategoria.interface';
import { CategoriaService } from '../../services/categoria.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-listar-subcategoria',
  templateUrl: './listar-subcategoria.component.html',
  styleUrls: ['./listar-subcategoria.component.css']
})
export class ListarSubcategoriaComponent implements OnInit {
  subcategorias: Subcategoria[] = [];
  categorias: any[] = [];
  subcategoriaSeleccionada: Subcategoria | null = null;
  editarForm: FormGroup;

  constructor(
    private router: Router,
    @Inject(CategoriaService) private categoriaService: CategoriaService,
    @Inject(SubcategoriaService) private subcategoriaService: SubcategoriaService,
    private formBuilder: FormBuilder
  ) {
    this.editarForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      subcategoria: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    });
  }

  ngOnInit(): void {
    this.obtenerSubcategorias();
    this.obtenerCategorias();
  }

  obtenerSubcategorias(): void {
    this.subcategoriaService.obtenerSubcategorias().subscribe(
      (subcategorias: Subcategoria[]) => {
        this.subcategorias = subcategorias;
        console.log(this.subcategorias);
      },
      (error) => {
        console.error('Error al obtener subcategorías:', error);
      }
    );
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (categorias: any[]) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  eliminarSubcategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta subcategoría?')) {
      this.subcategoriaService.eliminarSubcategoria(id).subscribe(
        () => {
          console.log('Subcategoría eliminada correctamente');
          this.showAlert('Subcategoría eliminada correctamente', 'alert-success');
          this.obtenerSubcategorias();
        },
        (error) => {
          console.error('Error al eliminar subcategoría:', error);
          this.showAlert('Error al eliminar subcategoría', 'alert-danger');
        }
      );
    }
  }

  toggleEditForm(subcategoria: Subcategoria | null): void {
    if (subcategoria) {
      this.editarForm.patchValue({
        categoria: subcategoria.categoria,
        subcategoria: subcategoria.subcategoria
      });
      this.subcategoriaSeleccionada = subcategoria;

      const modalElement = document.getElementById('editarSubcategoriaModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  guardarSubcategoria(): void {
    if (this.editarForm.invalid) {
      return;
    }

    const { categoria, subcategoria } = this.editarForm.value;

    if (this.subcategoriaSeleccionada) {
      const updatedSubcategoria: Subcategoria = {
        ...this.subcategoriaSeleccionada,
        categoria,
        subcategoria
      };

      this.subcategoriaService.actualizarSubcategoria(updatedSubcategoria.id, updatedSubcategoria).subscribe(
        () => {
          console.log('Subcategoría actualizada correctamente');
          this.showAlert('Subcategoría actualizada correctamente', 'alert-success');
          this.obtenerSubcategorias();
          const modalElement = document.getElementById('editarSubcategoriaModal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.hide();
          }
        },
        (error) => {
          console.error('Error al actualizar subcategoría:', error);
          this.showAlert('Error al actualizar subcategoría', 'alert-danger');
        }
      );
    }
  }

  irAFormulario(): void {
    this.router.navigate(['/admin/crear-subcategoria']);
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
