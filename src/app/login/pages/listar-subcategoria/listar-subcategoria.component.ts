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
  subcategoria: Subcategoria[] = [];
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
      subcategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerSubcategoria();
    this.obtenerCategorias();
  }

  obtenerSubcategoria(): void {
    this.subcategoriaService.obtenerSubcategoria().subscribe(
      (subcategoria: Subcategoria[]) => {
        this.subcategoria = subcategoria;
        console.log(this.subcategoria);
      },
      (error) => {
        console.error('Error al obtener subcategoría:', error);
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

  eliminarSubcategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.subcategoriaService.eliminarSubcategoria(id).subscribe(
        () => {
          console.log('Categoría eliminada correctamente');
          this.showAlert('Categoría eliminada correctamente', 'alert-success');
          this.obtenerSubcategoria();
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
        subcategoria: subcategoria.categoria
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

    if (this.subcategoriaSeleccionada) {
      const updatedSubcategoria: Subcategoria = {
        ...this.subcategoriaSeleccionada,
        categoria: this.editarForm.get('categoria')?.value
      };

      this.subcategoriaService.actualizarSubcategoria(updatedSubcategoria.id, updatedSubcategoria).subscribe(
        () => {
          console.log('Categoría actualizada correctamente');
          this.showAlert('Categoría actualizada correctamente', 'alert-success');
          this.obtenerSubcategoria();
          const modalElement = document.getElementById('editarCategoriaModal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.hide();
          }
        },
        (error) => {
          console.error('Error al actualizar categoría:', error);
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
