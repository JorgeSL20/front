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
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
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
            id: 0, // Proporciona un valor válido para 'id'
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
    }
  }

  regresar() {
    this.router.navigate(['/user/listar-carruseles']);
  }
}
