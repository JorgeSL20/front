// src/app/components/listar-ubicacion/listar-ubicacion.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Ubicacion } from '../../interfaces/ubicacion.interface';
import { UbicacionService } from '../../services/ubicacion.service';

@Component({
  selector: 'app-listar-ubicacion',
  templateUrl: './listar-ubicacion.component.html',
  styleUrls: ['./listar-ubicacion.component.css']
})
export class ListarUbicacionComponent implements OnInit {
  ubicaciones: Ubicacion[] = [];

  constructor(private router: Router, @Inject(UbicacionService) private ubicacionService: UbicacionService) { }

  ngOnInit(): void {
    this.obtenerUbicaciones();
  }

  obtenerUbicaciones(): void {
    this.ubicacionService.obtenerUbicaciones().subscribe(
      (ubicaciones: Ubicacion[]) => {
        this.ubicaciones = ubicaciones;
        console.log(this.ubicaciones);
      },
      (error) => {
        console.error('Error al obtener ubicaciones:', error);
      }
    );
  }

  eliminarUbicacion(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta ubicación?')) {
      this.ubicacionService.eliminarUbicacion(id).subscribe(
        () => {
          console.log('Ubicación eliminada correctamente');
          this.showAlert('Ubicación eliminada correctamente', 'alert-success');
          this.obtenerUbicaciones();
        },
        (error) => {
          console.error('Error al eliminar ubicación:', error);
          this.showAlert('Error al eliminar ubicación', 'alert-danger');
        }
      );
    }
  }

  irAFormulario(): void {
    this.router.navigate(['/admin/crear-ubicacion']);
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
