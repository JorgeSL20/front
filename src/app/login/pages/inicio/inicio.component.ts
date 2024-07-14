import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit {
  @ViewChild('reproductorVideo') reproductorVideo!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Iniciar la reproducción del video automáticamente sin sonido
    this.reproducirVideo();
  }

  reproducirVideo(): void {
    if (this.reproductorVideo) {
      const videoElement = this.reproductorVideo.nativeElement;
      videoElement.muted = true; // Asegurar que el video esté sin sonido
      videoElement.play()
        .catch((error: any) => console.error('Error al reproducir el video:', error));
    }
  }

  navegar(): void {
    this.router.navigate(['/']);
  }
}
