import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Marca } from '../../interfaces/marca.interface';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {
  marca: Marca[] = [];
  editarForm: FormGroup;
  marcaSeleccionada: Marca | null = null;
  modalAbierto: boolean = false;

  constructor(
    private router: Router,
    @Inject(MarcaService) private marcaService: MarcaService,
    private formBuilder: FormBuilder
  ) {
    this.editarForm = this.formBuilder.group({
      marca: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerMarca();
  }

  obtenerMarca(): void {
    this.marcaService.obtenerMarca().subscribe(
      (marca: Marca[]) => {
        this.marca = marca;
        console.log(this.marca);
      },
      (error) => {
        console.error('Error al obtener marca:', error);
      }
    );
  }

  eliminarMarca(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta marca?')) {
      this.marcaService.eliminarMarca(id).subscribe(
        () => {
          console.log('Marca eliminada correctamente');
          this.showAlert('Marca eliminada correctamente', 'alert-success');
          this.obtenerMarca();
        },
        (error) => {
          console.error('Error al eliminar marca:', error);
          this.showAlert('Error al eliminar marca', 'alert-danger');
        }
      );
    }
  }

  abrirModal(marca: Marca): void {
    this.marcaSeleccionada = marca;
    this.editarForm.patchValue(marca);
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
  }

  guardarCambios(): void {
    if (this.editarForm.valid && this.marcaSeleccionada) {
      const marcaActualizada: Marca = {
        ...this.marcaSeleccionada,
        ...this.editarForm.value
      };
  
      this.marcaService.actualizarMarca(marcaActualizada.id, marcaActualizada).subscribe(
        () => {
          console.log('Marca actualizada correctamente');
          this.showAlert('Marca actualizada correctamente', 'alert-success');
          this.obtenerMarca();
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al actualizar marca:', error);
          this.showAlert('Error al actualizar marca', 'alert-danger');
        }
      );
    }
  }

  irAFormulario(): void {
    this.router.navigate(['/user/crear-marca']);
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
