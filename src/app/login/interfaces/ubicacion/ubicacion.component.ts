import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../services/ubicacion.service';
import { ActivatedRoute } from '@angular/router';
import { Ubicacion } from '../../interfaces/ubicacion.interface';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  ubicacionLink: string = '';

  constructor(
    private ubicacionService: UbicacionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ubicacionService.obtenerUbicacionPorId(id).subscribe(
      (ubicacion: Ubicacion) => {
        this.ubicacionLink = ubicacion.url;  // Asegúrate de que 'url' sea el nombre correcto
      },
      (error) => {
        console.error('Error al obtener la ubicación', error);
      }
    );
  }
}
