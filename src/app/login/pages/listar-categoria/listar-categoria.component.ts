import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {
  categoria: Categoria[] = [];
  categoriaSeleccionada: Categoria | null = null;
  editarForm: FormGroup;

  constructor(
    private router: Router,
    @Inject(CategoriaService) private categoriaService: CategoriaService,
    private formBuilder: FormBuilder
  ) {
    this.editarForm = this.formBuilder.group({
      categoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerCategoria();
  }

  obtenerCategoria(): void {
    this.categoriaService.obtenerCategoria().subscribe(
      (categoria: Categoria[]) => {
        this.categoria = categoria;
        console.log(this.categoria);
      },
      (error) => {
        console.error('Error al obtener categoría:', error);
      }
    );
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(id).subscribe(
        () => {
          console.log('Categoría eliminada correctamente');
          this.showAlert('Categoría eliminada correctamente', 'alert-success');
          this.obtenerCategoria();
        },
        (error) => {
          console.error('Error al eliminar categoría:', error);
          this.showAlert('Error al eliminar categoría', 'alert-danger');
        }
      );
    }
  }

  toggleEditForm(categoria: Categoria | null): void {
    if (categoria) {
      this.editarForm.patchValue({
        categoria: categoria.categoria
      });
      this.categoriaSeleccionada = categoria;

      const modalElement = document.getElementById('editarCategoriaModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  guardarCategoria(): void {
    if (this.editarForm.invalid) {
      return;
    }

    if (this.categoriaSeleccionada) {
      const updatedCategoria: Categoria = {
        ...this.categoriaSeleccionada,
        categoria: this.editarForm.get('categoria')?.value
      };

      this.categoriaService.actualizarCategoria(updatedCategoria.id, updatedCategoria).subscribe(
        () => {
          console.log('Categoría actualizada correctamente');
          this.showAlert('Categoría actualizada correctamente', 'alert-success');
          this.obtenerCategoria();
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
    this.router.navigate(['/user/crear-categoria']);
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
