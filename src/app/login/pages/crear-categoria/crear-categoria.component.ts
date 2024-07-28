import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      categoria: ['', Validators.required],
    });
  }

  guardarCategoria() {
    if (this.myForm.valid) {
      const categoriaData = this.myForm.value;
      this.categoriaService.crearCategoria(categoriaData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/user/listar-categoria']);
          this.showAlert('Categoria Creada con exito', 'alert-success');
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  regresar() {
    this.router.navigate(['/user/listar-categoria']);
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