import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Marca } from '../../interfaces/marca.interface';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {
  marca: Marca[] = [];

  constructor(private router: Router, @Inject(MarcaService) private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.obtenerMarca();
  }

  obtenerMarca(): void {
    this.marcaService.obtenerMarca().subscribe(
      (marca: Marca[]) => {
        this.marca = marca;
        console.log(this.marca); // Puedes hacer lo que necesites con los productos
      },
      (error) => {
        console.error('Error al obtener marca:', error);
      }
    );
  }

  eliminarMarca(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.marcaService.eliminarMarca(id).subscribe(
        () => {
          console.log('Marca eliminado correctamente');
          this.showAlert('Marca eliminada correctamente', 'alert-success');
          // Volver a cargar los productos después de eliminar
          this.obtenerMarca();
        },
        (error) => {
          console.error('Error al eliminar marca:', error);
          this.showAlert('Error al eliminar marca:', 'alert-danger');
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