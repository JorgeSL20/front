import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { CategoriaService } from '../../services/categoria.service'; 
import { Subcategoria } from '../../interfaces/subcategoria.interface';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-listar-subcategoria',
  templateUrl: './listar-subcategoria.component.html',
  styleUrls: ['./listar-subcategoria.component.css']
})
export class ListarSubcategoriaComponent implements OnInit {
  subcategorias: Subcategoria[] = [];
  categorias: Categoria[] = [];
  subcategoriaSeleccionada: Subcategoria | null = null;
  editarForm: FormGroup;

  constructor(
    private router: Router,
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
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
    this.subcategoriaService.obtenerSubcategoria().subscribe(
      (subcategorias: Subcategoria[]) => {
        this.subcategorias = subcategorias;
      },
      (error) => {
        console.error('Error al obtener subcategorías:', error);
      }
    );
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategoria().subscribe(
      (categorias: Categoria[]) => {
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
          this.obtenerSubcategorias();
        },
        (error) => {
          console.error('Error al eliminar subcategoría:', error);
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
    }
  }

  guardarSubcategoria(): void {
    if (this.editarForm.invalid) {
      return;
    }

    const subcategoriaNueva = this.editarForm.get('subcategoria')?.value;
    if (this.subcategorias.some(sub => sub.subcategoria === subcategoriaNueva && sub.id !== this.subcategoriaSeleccionada?.id)) {
      this.editarForm.get('subcategoria')?.setErrors({ duplicate: true });
      return;
    }

    if (this.subcategoriaSeleccionada) {
      const updatedSubcategoria: Subcategoria = {
        ...this.subcategoriaSeleccionada,
        categoria: this.editarForm.get('categoria')?.value,
        subcategoria: this.editarForm.get('subcategoria')?.value
      };

      this.subcategoriaService.actualizarSubcategoria(updatedSubcategoria.id, updatedSubcategoria).subscribe(
        () => {
          this.obtenerSubcategorias();
          // No se usa bootstrap.Modal para cerrar el modal
          const modalElement = document.getElementById('editarSubcategoriaModal');
          if (modalElement) {
            (modalElement as any).style.display = 'none'; // Ocultar el modal manualmente
          }
        },
        (error) => {
          console.error('Error al actualizar subcategoría:', error);
        }
      );
    }
  }

  irAFormulario(): void {
    this.router.navigate(['/admin/crear-subcategoria']);
  }
}
