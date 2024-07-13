import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  //private url: string = 'http://localhost:3000/producto/';
  private url: string = 'https://proyectogatewayback-production.up.railway.app/producto/';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  crearProducto(newProducto: FormData): Observable<Producto> {
    return this.http.post<Producto>(this.url, newProducto);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  // Otros métodos del servicio, como actualizarProducto(), eliminarProducto(), etc.
}
