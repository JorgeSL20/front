import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  

  ngOnInit(): void {
    // Puedes realizar inicializaciones o lógica adicional aquí
  }
  constructor(private el: ElementRef) { }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Lógica que quieres ejecutar cuando ocurre el evento de desplazamiento
  
    // Por ejemplo, puedes verificar si un elemento está en la vista y realizar alguna acción
    const cards = this.el.nativeElement.querySelectorAll('.card');
    cards.forEach((card: HTMLElement) => {  // Agrega el tipo HTMLElement
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
}
