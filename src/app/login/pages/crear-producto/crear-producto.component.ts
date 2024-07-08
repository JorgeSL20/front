import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router'; // Importa Router desde @angular/router

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService, // Cambia el nombre de ProductoService a productoService
    private router: Router // Agrega Router al constructor
  ) {
    this.myForm = this.formBuilder.group({
      imagenP: ['', Validators.required],
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      existencias: ['', Validators.required],
    });
  }

  guardarProducto() {
    if (this.myForm.valid) {
      // Obtener los valores del formulario
      const productoData = this.myForm.value;

      // Llamar al servicio para crear el producto
      this.productoService.crearProducto(productoData).subscribe(
        response => {
          console.log(response); // Puedes mostrar la respuesta del backend en la consola
          // Aquí puedes manejar la respuesta del backend, como mostrar mensajes de éxito, redirigir, etc.
          this.router.navigate(['/user/listar-producto']); // Redirige después de guardar el producto
        },
        error => {
          console.error(error); // Manejar errores en caso de que la solicitud falle
          // Aquí puedes mostrar mensajes de error al usuario
        }
      );
    }
  }

  regresar() {
    this.router.navigate(['/user/listar-producto']); // Redirige al componente listar-producto
  }
}
