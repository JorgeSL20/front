import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../interfaces/marca.interface';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private url: string = 'https://proyectogatewayback-production.up.railway.app/marca/';

  constructor(private http: HttpClient) { }

  obtenerMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.url);
  }

  crearMarca(newMarca: FormData): Observable<Marca> {
    return this.http.post<Marca>(this.url, newMarca);
  }

  eliminarMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  actualizarMarca(id: number, updatedMarca: Marca): Observable<Marca> {
    return this.http.patch<Marca>(`${this.url}${id}`, updatedMarca);
  }
}
