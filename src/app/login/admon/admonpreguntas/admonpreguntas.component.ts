import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataPreguntas } from '../../interfaces/dataPreguntas.interface';

@Component({
  selector: 'app-admonpreguntas',
  templateUrl: './admonpreguntas.component.html',
  styleUrls: ['./admonpreguntas.component.css']
})
export class AdmonpreguntasComponent implements OnInit {
  preguntas: DataPreguntas[] = [];
  mostrarFormularioEdicion = false;
  updatePreguntasForm!: FormGroup;
  agregarPreguntasForm!: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit() {
    this.updatePreguntasForm = this.fb.group({
      id_preguntas: ['', Validators.required],
      preguntas: ['', Validators.required],
      respuestas: ['', Validators.required]
    });

    this.agregarPreguntasForm = this.fb.group({
      preguntas: ['', Validators.required],
      respuestas: ['', Validators.required]
    });

    this.getPreguntas();
  }

  getPreguntas() {
    this.loginService.getPreguntas().subscribe(
      (data: DataPreguntas[]) => {
        this.preguntas = data;
      },
      (error) => {
        console.error('Error al obtener preguntas:', error);
      }
    );
  }

  editarPregunta(pregunta: DataPreguntas) {
    this.updatePreguntasForm.patchValue({
      id_preguntas: pregunta.id_preguntas,
      preguntas: pregunta.preguntas,
      respuestas: pregunta.respuestas
    });
    this.mostrarFormularioEdicion = true;
  }

  guardarEdicion() {
    const preguntaEditada = this.updatePreguntasForm.value;
    const idPregunta = preguntaEditada.id_preguntas;
    delete preguntaEditada.id_preguntas;

    this.loginService.updatePreguntas(idPregunta, preguntaEditada).subscribe(
      (response) => {
        console.log('Pregunta actualizada correctamente:', response);
        this.getPreguntas();
        this.mostrarFormularioEdicion = false;
      },
      (error) => {
        console.error('Error al actualizar pregunta:', error);
      }
    );
  }

  agregarPregunta() {
    const nuevaPregunta = this.agregarPreguntasForm.value;
    this.loginService.createPreguntas(nuevaPregunta).subscribe(
      (response) => {
        console.log('Pregunta creada correctamente:', response);
        this.getPreguntas();
        // Limpiar el formulario después de agregar una nueva pregunta
        this.agregarPreguntasForm.reset();
      },
      (error) => {
        console.error('Error al crear pregunta:', error);
      }
    );
  }

  eliminarPregunta(idPregunta: string) {
    this.loginService.deletePregunta(idPregunta).subscribe(
      (response) => {
        console.log('Pregunta eliminada correctamente:', response);
        this.getPreguntas();
      },
      (error) => {
        console.error('Error al eliminar pregunta:', error);
      }
    );
  }
}
