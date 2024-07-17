import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app/carrito'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  agregarItem(usuarioId: number, productoId: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, { usuarioId, productoId, cantidad });
  }

  obtenerItemsCarrito(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${usuarioId}`);
  }

  eliminarItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`);
  }

  obtenerTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
