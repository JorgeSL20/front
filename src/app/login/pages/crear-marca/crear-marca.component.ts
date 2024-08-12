import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.css']
})
export class CrearMarcaComponent implements OnInit {
  myForm: FormGroup;
  marcasExistentes: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private marcaService: MarcaService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      marca: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    });
  }

  ngOnInit(): void {
    this.marcaService.obtenerMarca().subscribe(marcas => {
      this.marcasExistentes = marcas.map(m => m.marca.toLowerCase());
    });
  }

  guardarMarca() {
    const nuevaMarca = this.myForm.get('marca')?.value.toLowerCase();

    if (this.myForm.valid && !this.marcasExistentes.includes(nuevaMarca)) {
      const marcaData = this.myForm.value;
      this.marcaService.crearMarca(marcaData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin/listar-marca']);
          this.showAlert('Marca Creada con éxito', 'alert-success');
        },
        error => {
          console.error(error);
          this.showAlert('Error al crear la marca', 'alert-danger');
        }
      );
    } else {
      this.showAlert('La marca ya existe', 'alert-danger');
    }
  }

  regresar() {
    this.router.navigate(['/admin/listar-marca']);
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
