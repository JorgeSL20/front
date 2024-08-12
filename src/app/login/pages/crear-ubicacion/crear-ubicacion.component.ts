import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UbicacionService } from '../../services/ubicacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-ubicacion',
  templateUrl: './crear-ubicacion.component.html',
  styleUrls: ['./crear-ubicacion.component.css']
})
export class CrearUbicacionComponent implements OnInit {
  myForm: FormGroup;
  ubicacionId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private ubicacionService: UbicacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ubicacionId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarUbicacion();
  }

  cargarUbicacion() {
    this.ubicacionService.obtenerUbicacionPorId(this.ubicacionId).subscribe(
      response => {
        this.myForm.patchValue(response);
      },
      error => {
        console.error(error);
        this.showAlert('Error al cargar la ubicación', 'alert-danger');
      }
    );
  }

  actualizarUbicacion() {
    if (this.myForm.valid) {
      const ubicacionData = this.myForm.value;
      this.ubicacionService.actualizarUbicacion(this.ubicacionId, ubicacionData).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/admin/listar-ubicacion']);
          this.showAlert('Ubicación actualizada con éxito', 'alert-success');
        },
        error => {
          console.error(error);
          this.showAlert('Error al actualizar la ubicación', 'alert-danger');
        }
      );
    }
  }

  regresar() {
    this.router.navigate(['/admin/listar-ubicacion']);
  }

  showAlert(message: string, alertClass: string) {
    const alertDiv = document.createElement('div');
    
    }}