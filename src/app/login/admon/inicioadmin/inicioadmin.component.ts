import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarruselService } from '../../services/carrusel.service';
import { Carrusel } from '../../interfaces/carrusel.interface';

@Component({
  selector: 'app-inicioadmin',
  templateUrl: './inicioadmin.component.html',
  styleUrl: './inicioadmin.component.css'
})
export class InicioadminComponent implements AfterViewInit, OnInit {
  @ViewChild('reproductorVideo') reproductorVideo!: ElementRef<HTMLVideoElement>;
  carrusel: Carrusel[] = [];

  constructor(private router: Router, private carruselService: CarruselService) {}

  ngOnInit(): void {
    this.obtenerCarrusel();
  }

  ngAfterViewInit(): void {
    this.reproducirVideo();
    this.agregarEventoTermino();
  }

  obtenerCarrusel(): void {
    this.carruselService.findAllCarruseles().subscribe(
      (carrusel: Carrusel[]) => {
        this.carrusel = carrusel;
        console.log(this.carrusel);
      },
      (error) => {
        console.error('Error al obtener carrusel:', error);
      }
    );
  }

  reproducirVideo(): void {
    if (this.reproductorVideo) {
      const videoElement = this.reproductorVideo.nativeElement;
      videoElement.muted = true; // Asegurar que el video esté sin sonido
      videoElement.play()
        .catch((error: any) => console.error('Error al reproducir el video:', error));
    }
  }

  agregarEventoTermino(): void {
    const videoElement = this.reproductorVideo.nativeElement;
    videoElement.addEventListener('ended', () => {
      videoElement.currentTime = 0;
      videoElement.play()
        .catch((error: any) => console.error('Error al reiniciar el video:', error));
    });
  }

}
