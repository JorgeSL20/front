import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url: string = 'https://proyectogatewayback-production.up.railway.app/categoria/';

  constructor(private http: HttpClient) { }

  obtenerCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }

  crearCategoria(newCategoria: FormData): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, newCategoria);
  }

  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  actualizarCategoria(id: number, updatedCategoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.url}${id}`, updatedCategoria);
  }
}
