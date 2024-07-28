import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-quienessomos',
  templateUrl: './quienessomos.component.html',
  styleUrls: ['./quienessomos.component.css'],
})
export class QuienessomosComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    const boxes = document.querySelectorAll('.box') as NodeListOf<HTMLElement>;

    // Variable para almacenar la altura de la información adicional de la caja 1
    let additionalInfo1Height = 0;

    // Función para ajustar la posición de la caja 2
    const adjustBox2Position = () => {
      const box1 = this.el.nativeElement.querySelector('.box1');
      const box2 = this.el.nativeElement.querySelector('.box2');
      const additionalInfo1 = box1.querySelector('.additional-info');
      const box2Top = additionalInfo1.offsetHeight + additionalInfo1.offsetTop + 20; // 20px de espacio

      this.renderer.setStyle(box2, 'top', box2Top + 'px');
    };

    // Agregar event listeners para cada caja
    boxes.forEach(box => {
      this.renderer.listen(box, 'mouseover', () => {
        // Mostrar la información adicional al pasar el mouse sobre la caja
        const additionalInfo = box.querySelector('.additional-info');
        this.renderer.setStyle(additionalInfo, 'display', 'block');

        // Ajustar la posición de la caja 2 cuando se muestra la información adicional de la caja 1
        if (box.classList.contains('box1')) {
          adjustBox2Position();
        }
      });

      this.renderer.listen(box, 'mouseout', () => {
        // Ocultar la información adicional al quitar el mouse de la caja
        const additionalInfo = box.querySelector('.additional-info');
        this.renderer.setStyle(additionalInfo, 'display', 'none');
      });
    });

    // Ajustar la posición de la caja 2 al cargar la página
    this.renderer.listen(window, 'load', () => {
      adjustBox2Position();
    });
  }
}
