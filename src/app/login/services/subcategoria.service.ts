import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcategoria } from '../interfaces/subcategoria.interface';

@Injectable({
  providedIn: 'root'
})

export class SubcategoriaService {
  private url: string = 'https://proyectogatewayback-production.up.railway.app/subcategoria/';

  constructor(private http: HttpClient) { }

  obtenerSubcategoria(): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(this.url);
  }

  crearSubcategoria(newSubcategoria: FormData): Observable<Subcategoria> {
    return this.http.post<Subcategoria>(this.url, newSubcategoria);
  }

  eliminarSubcategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  actualizarSubcategoria(id: number, updatedSubcategoria: Subcategoria): Observable<Subcategoria> {
    return this.http.put<Subcategoria>(`${this.url}${id}`, updatedSubcategoria);
  }
}
