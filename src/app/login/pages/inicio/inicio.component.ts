import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  @ViewChild('reproductorVideo') reproductorVideo: any;

  constructor(private router: Router, private el: ElementRef) {}

  ngOnInit(): void {
    // Inicializar el componente, si es necesario
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Lógica que quieres ejecutar cuando ocurre el evento de desplazamiento

    // Por ejemplo, puedes verificar si un elemento está en la vista y realizar alguna acción
    const cards = this.el.nativeElement.querySelectorAll('.card');
    cards.forEach((card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        // La tarjeta está en la vista, puedes realizar alguna acción aquí
        // Por ejemplo, añadir una clase, cargar datos adicionales, etc.
        card.classList.add('visible');
      } else {
        // La tarjeta no está en la vista, puedes revertir la acción si es necesario
        card.classList.remove('visible');
      }
    });
  }
  reproducirVideo(): void {
    if (this.reproductorVideo) {
      this.reproductorVideo.nativeElement.play()
        .catch((error: any) => console.error('Error al reproducir el video:', error));
    }
  }
  
  pausarVideo(): void {
    if (this.reproductorVideo) {
      this.reproductorVideo.nativeElement.pause();
    }
  }

  navegar(): void {
    this.router.navigate(['/']);
  }
}