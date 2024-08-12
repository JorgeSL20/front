// src/app/components/crear-carrusel/crear-carrusel.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarruselService } from '../../services/carrusel.service';
import { Router } from '@angular/router';
import { Carrusel } from '../../interfaces/carrusel.interface';

@Component({
  selector: 'app-crear-carrusel',
  templateUrl: './crear-carrusel.component.html',
  styleUrls: ['./crear-carrusel.component.css']
})
export class CrearCarruselComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carruselService: CarruselService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      file: ['', Validators.required],
    });
  }

  guardarCarrusel() {
    if (this.myForm.valid) {
      const formData = new FormData();
      const fileInput = (document.getElementById('file') as HTMLInputElement).files;

      if (fileInput && fileInput.length > 0) {
        formData.append('file', fileInput[0]);

        this.carruselService.uploadImage(formData).subscribe(
          (response: any) => {
            console.log('Imagen subida:', response);
            const createCarruselDto: Carrusel = {
              id: 0,
              url: response.secure_url,
            };
            this.carruselService.createCarrusel(createCarruselDto).subscribe(
              (carrusel: Carrusel) => {
                console.log('Carrusel creado:', carrusel);
                this.router.navigate(['/admin/listar-carrusel']);
                this.showAlert('Imagen agregada a carrusel correctamente', 'alert-success');
              },
              error => {
                console.error('Error al crear carrusel:', error);
                this.showAlert('Error al crear carrusel', 'alert-danger');
              }
            );
          },
          error => {
            console.error('Error al subir imagen:', error);
            this.showAlert('Error al subir imagen', 'alert-danger');
          }
        );
      } else {
        console.error('No se ha seleccionado ningún archivo');
        this.showAlert('No se ha seleccionado ningún archivo', 'alert-danger');
      }
    }
  }

  regresar() {
    this.router.navigate(['/user/listar-carrusel']);
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
