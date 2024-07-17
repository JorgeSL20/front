import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrito } from '../interfaces/carrito.interface'; // Importa la interface Carrito

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app/carrito';

  constructor(private http: HttpClient) {}

  agregarItem(usuarioId: number, productoId: number, cantidad: number): Observable<any> {
    return this.http.post<Carrito>(`${this.apiUrl}/agregar`, { usuarioId, productoId, cantidad });
  }

  obtenerItemsCarrito(usuarioId: number): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.apiUrl}/${usuarioId}`);
  }

  eliminarItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${id}`);
  }

  obtenerProductoPorId(productoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos/${productoId}`); // Reemplaza URL_DEL_BACKEND con la URL real de tu backend
  }
}
