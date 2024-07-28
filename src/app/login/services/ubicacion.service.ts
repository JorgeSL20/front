// src/app/services/ubicacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ubicacion } from '../interfaces/ubicacion.interface';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private url: string = 'https://proyectogatewayback-production.up.railway.app/ubicacion/';

  constructor(private http: HttpClient) {}

  obtenerUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(this.url);
  }

  crearUbicacion(newUbicacion: Ubicacion): Observable<Ubicacion> {
    return this.http.post<Ubicacion>(this.url, newUbicacion);
  }

  eliminarUbicacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  actualizarUbicacion(id: number, ubicacion: Ubicacion): Observable<Ubicacion> {
    return this.http.patch<Ubicacion>(`${this.url}${id}`, ubicacion);
  }

  obtenerUbicacionPorId(id: number): Observable<Ubicacion> {
    return this.http.get<Ubicacion>(`${this.url}${id}`);
  }
}
