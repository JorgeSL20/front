import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marca } from '../../interfaces/marca.interface';
import { MarcaService } from '../../services/marca.service';

declare var bootstrap: any;

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {
  marcas: Marca[] = [];
  marcaSeleccionada: Marca | null = null;
  editarForm: FormGroup;

  constructor(
    private marcaService: MarcaService,
    private formBuilder: FormBuilder
  ) {
    this.editarForm = this.formBuilder.group({
      marca: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  obtenerMarcas(): void {
    this.marcaService.obtenerMarca().subscribe(
      (marcas: Marca[]) => {
        this.marcas = marcas;
      },
      (error) => {
        console.error('Error al obtener marcas:', error);
      }
    );
  }

  toggleEditForm(marca: Marca | null): void {
    if (marca) {
      this.editarForm.patchValue({
        marca: marca.marca  // Cambiado a 'marca'
      });
      this.marcaSeleccionada = marca;

      // Muestra el modal
      const modalElement = document.getElementById('editarMarcaModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }

  guardarMarca(): void {
    if (this.editarForm.invalid) {
      return;
    }

    if (this.marcaSeleccionada) {
      const updatedMarca: Marca = {
        ...this.marcaSeleccionada,
        marca: this.editarForm.get('marca')?.value  // Cambiado a 'marca'
      };

      this.marcaService.actualizarMarca(updatedMarca.id, updatedMarca).subscribe(
        () => {
          console.log('Marca actualizada correctamente');
          this.showAlert('Marca actualizada correctamente', 'alert-success');
          this.obtenerMarcas();
          const modalElement = document.getElementById('editarMarcaModal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.hide();
          }
        },
        (error) => {
          console.error('Error al actualizar marca:', error);
          this.showAlert('Error al actualizar marca', 'alert-danger');
        }
      );
    }
  }

  eliminarMarca(id: number): void {
    this.marcaService.eliminarMarca(id).subscribe(
      () => {
        console.log('Marca eliminada');
        this.showAlert('Marca eliminada con exito', 'alert-success');
        this.obtenerMarcas();
      },
      (error) => {
        console.error('Error al eliminar marca:', error);
        this.showAlert('Error al eliminar marca', 'alert-danger');
      }
    );
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
