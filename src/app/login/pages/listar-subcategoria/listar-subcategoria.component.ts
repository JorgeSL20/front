import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar FormBuilder, FormGroup, y Validators
import { SubcategoriaService } from '../../services/subcategoria.service';
import { Subcategoria } from '../../interfaces/subcategoria.interface';

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
    private subcategoriaService: SubcategoriaService,
    private formBuilder: FormBuilder // Inyectar FormBuilder
  ) {
    // Inicializar el formulario
    this.editarForm = this.formBuilder.group({
      categoria: ['', Validators.required],
      subcategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerSubcategorias();
  }

  obtenerSubcategorias(): void {
    this.subcategoriaService.obtenerSubcategoria().subscribe(
      (subcategorias: Subcategoria[]) => {
        this.subcategorias = subcategorias;
      },
      (error: any) => {  // Añadir el tipo `any` o el tipo adecuado para el error
        console.error('Error al obtener subcategorías:', error);
      }
    );
  }

  toggleEditForm(subcategoria: Subcategoria | null): void {
    if (subcategoria) {
      this.editarForm.patchValue({
        categoria: subcategoria.categoria,
        subcategoria: subcategoria.subcategoria
      });
      this.subcategoriaSeleccionada = subcategoria;

      // Muestra el modal
      const modalElement = document.getElementById('editarSubcategoriaModal');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  guardarSubcategoria(): void {
    if (this.editarForm.invalid) {
      return;
    }
  
    const updatedSubcategoria: Partial<Subcategoria> = {
      subcategoria: this.editarForm.get('subcategoria')?.value
    };
  
    if (this.subcategoriaSeleccionada) {
      this.subcategoriaService.actualizarSubcategoria(this.subcategoriaSeleccionada.id, updatedSubcategoria).subscribe(
        () => {
          console.log('Subcategoría actualizada correctamente');
          this.obtenerSubcategorias();
  
          // Ocultar el modal
          const modalElement = document.getElementById('editarSubcategoriaModal');
          if (modalElement) {
            const modal = new (window as any).bootstrap.Modal(modalElement);
            modal.hide();
          }
        },
        (error: any) => {
          console.error('Error al actualizar subcategoría:', error);
        }
      );
    }
  }
  
  eliminarSubcategoria(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta subcategoría?')) {
      this.subcategoriaService.eliminarSubcategoria(id).subscribe(
        () => {
          console.log('Subcategoría eliminada correctamente');
          this.obtenerSubcategorias();
        },
        (error: any) => {  // Añadir el tipo `any` o el tipo adecuado para el error
          console.error('Error al eliminar subcategoría:', error);
        }
      );
    }
  }
}
