import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      marca: ['', Validators.required],
    });
  }

  guardarMarca() {
    if (this.myForm.valid) {
      const marcaData = this.myForm.value;
      this.marcaService.crearMarca(marcaData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/user/listar-marca']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  regresar() {
    this.router.navigate(['/user/listar-marca']);
  }
}
