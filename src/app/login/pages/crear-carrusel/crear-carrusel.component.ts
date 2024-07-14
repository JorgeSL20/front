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
  selectedFile: File | null = null;
  isFileInvalid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private carruselService: CarruselService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      file: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.isFileInvalid = false; // Reseteamos la bandera si se selecciona un archivo
    } else {
      this.selectedFile = null;
      this.isFileInvalid = true; // Mostramos el mensaje de error si no hay archivo seleccionado
    }
  }

  guardarCarrusel() {
    if (this.myForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.carruselService.uploadImage(formData).subscribe(
        (response: any) => {
          console.log('Imagen subida:', response);
          const createCarruselDto: Carrusel = {
            id: 0,
            url: response.secure_url,
            publicId: response.public_id
          };
          this.carruselService.createCarrusel(createCarruselDto).subscribe(
            (carrusel: Carrusel) => {
              console.log('Carrusel creado:', carrusel);
              this.router.navigate(['/user/listar-carruseles']);
            },
            error => {
              console.error('Error al crear carrusel:', error);
            }
          );
        },
        error => {
          console.error('Error al subir imagen:', error);
        }
      );
    } else {
      this.isFileInvalid = true;
      console.error('No se ha seleccionado ningún archivo');
    }
  }

  regresar() {
    this.router.navigate(['/user/listar-carruseles']);
  }
}
