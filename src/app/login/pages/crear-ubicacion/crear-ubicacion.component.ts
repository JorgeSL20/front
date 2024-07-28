// src/app/components/crear-ubicacion/crear-ubicacion.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UbicacionService } from '../../services/ubicacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-ubicacion',
  templateUrl: './crear-ubicacion.component.html',
  styleUrls: ['./crear-ubicacion.component.css']
})
export class CrearUbicacionComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ubicacionService: UbicacionService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      zoom: ['', [Validators.required, Validators.min(0), Validators.max(21)]]
    });
  }

  guardarUbicacion() {
    if (this.myForm.valid) {
      const ubicacionData = this.myForm.value;
      this.ubicacionService.crearUbicacion(ubicacionData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/user/listar-ubicacion']);
          this.showAlert('Ubicación creada con éxito', 'alert-success');
        },
        error => {
          console.error(error);
          this.showAlert('Error al crear la ubicación', 'alert-danger');
        }
      );
    }
    
  }

  regresar() {
    this.router.navigate(['/listar-ubicacion']);
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
