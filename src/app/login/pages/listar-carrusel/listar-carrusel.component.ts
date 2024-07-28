import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarruselService } from '../../services/carrusel.service';
import { Carrusel } from '../../interfaces/carrusel.interface';

@Component({
  selector: 'app-listar-carrusel',
  templateUrl: './listar-carrusel.component.html',
  styleUrls: ['./listar-carrusel.component.css']
})
export class ListarCarruselComponent implements OnInit {
  carrusel: Carrusel[] = [];

  constructor(private router: Router, private carruselService: CarruselService) { }

  ngOnInit(): void {
    this.obtenerCarrusel();
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

  // Cambia la función `eliminarCarrusel` por la siguiente
eliminarCarrusel(id: number): void {
  if (confirm('¿Estás seguro de eliminar este carrusel?')) {
    this.carruselService.removeCarrusel(id).subscribe(
      (response) => {
        console.log('Carrusel eliminado correctamente');
        
        this.obtenerCarrusel(); // Volver a cargar los carruseles después de eliminar
      },
      (error) => {
        console.error('Error al eliminar carrusel:', error);
      }
    );
  }
}


  irAFormulario(): void {
    this.router.navigate(['/user/crear-carrusel']);
  }
}
