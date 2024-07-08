import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { DataPreguntas } from '../dataPreguntas.interface';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  preguntas: DataPreguntas[] = [];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getPreguntas();
  }

  getPreguntas() {
    this.loginService.getPreguntas().subscribe(
      (data) => {
        this.preguntas = data;
      },
      (error) => {
        console.error('Error obteniendo preguntas:', error);
      }
    );
  }
}
