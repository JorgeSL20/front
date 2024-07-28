import { Component, OnInit } from '@angular/core';
import { UbicacionService } from '../../services/ubicacion.service';
import { Ubicacion } from '../../interfaces/ubicacion.interface';

@Component({
  selector: 'app-ubicacionpublico',
  templateUrl: './ubicacionpublico.component.html',
  styleUrls: ['./ubicacionpublico.component.css']
})
export class UbicacionpublicoComponent implements OnInit {
  ubicaciones: Ubicacion[] = [];
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  zoom = 17;
  options: google.maps.MapOptions = {
    scrollwheel: false
  };

  constructor(private ubicacionService: UbicacionService) { }

  ngOnInit() {
    this.obtenerUbicaciones();
  }

  obtenerUbicaciones(): void {
    this.ubicacionService.obtenerUbicaciones().subscribe(
      (ubicaciones: Ubicacion[]) => {
        this.ubicaciones = ubicaciones;
        if (this.ubicaciones.length > 0) {
          const ubicacion = this.ubicaciones[0];  // Tomar la primera ubicación
          this.center = { lat: ubicacion.latitude, lng: ubicacion.longitude };
          this.zoom = ubicacion.zoom;
        }
      },
      (error) => {
        console.error('Error al obtener ubicaciones:', error);
      }
    );
  }
}
