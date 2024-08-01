import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoriaService } from '../../services/subcategoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-subcategoria',
  templateUrl: './crear-subcategoria.component.html',
  styleUrls: ['./crear-subcategoria.component.css']
})
export class CrearSubcategoriaComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private SubcategoriaService: SubcategoriaService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      subcategoria: ['', Validators.required],
    });
  }

  guardarSubcategoria() {
    if (this.myForm.valid) {
      const subcategoriaData = this.myForm.value;
      this.SubcategoriaService.crearSubcategoria(subcategoriaData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/user/listar-subcategoria']);
          this.showAlert('Subcategoria Creada con exito', 'alert-success');
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  regresar() {
    this.router.navigate(['/user/listar-subcategoria']);
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
