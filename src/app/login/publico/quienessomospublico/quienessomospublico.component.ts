import { Component, ElementRef, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { DataInformacion } from '../../interfaces/dataInformacion.interface';

@Component({
  selector: 'app-quienessomospublico',
  templateUrl: './quienessomospublico.component.html',
  styleUrls: ['./quienessomospublico.component.css']
})
export class QuienessomospublicoComponent implements OnInit {
  dataInformacion: DataInformacion = {
    mision: "",
    vision: "",
    quienessomos: ""
  };
  imageSize: number = 100; // Tamaño inicial de la imagen
  largerImageSize: number = 150; // Tamaño de la imagen al hacer clic/tocar
  showMission: boolean = false;


  constructor(private elementRef: ElementRef, private loginService: LoginService) { }

  ngOnInit(): void {
    const idInformacion = localStorage.getItem('token');
    if (idInformacion !== null) {
      this.loginService.getDataInformacion(idInformacion).subscribe(data => {
        this.dataInformacion = data;
      });
    }
  }

  handleTouchStart() {
    // Cuando el usuario toca la imagen, aumenta su tamaño
    this.imageSize = this.largerImageSize;
  }

  toggleMission() {
    this.showMission = !this.showMission;
  }

  play() {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.play();
  }

  pause() {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.pause();
  }
}