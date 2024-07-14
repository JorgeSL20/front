import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarruselService } from '../../services/carrusel.service';
import { Router } from '@angular/router';
import { Carrusel } from '../../interfaces/carrusel.interface'; // Ajusta la ruta según sea necesario

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
      formData.append('file', this.myForm.get('file')!.value);

      this.carruselService.uploadImage(formData).subscribe(
        (response: any) => {
          console.log('Imagen subida:', response);
          const createCarruselDto: Carrusel = {
            id: 0, // Aquí debes proporcionar un valor válido para 'id'
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
