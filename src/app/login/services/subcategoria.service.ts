import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
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

  crearSubcategoria(newSubcategoria: Subcategoria): Observable<Subcategoria> {
    // Verificar unicidad antes de crear
    return this.verificarSubcategoriaUnica(newSubcategoria.subcategoria).pipe(
      switchMap(isUnique => {
        if (isUnique) {
          return this.http.post<Subcategoria>(this.url, newSubcategoria);
        } else {
          throw new Error('La subcategoría ya existe');
        }
      })
    );
  }

  eliminarSubcategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }

  actualizarSubcategoria(id: number, updatedSubcategoria: Partial<Subcategoria>): Observable<Subcategoria> {
    // Verificar unicidad antes de actualizar
    return this.verificarSubcategoriaUnica(updatedSubcategoria.subcategoria!).pipe(
      switchMap(isUnique => {
        if (isUnique) {
          return this.http.patch<Subcategoria>(`${this.url}${id}`, updatedSubcategoria);
        } else {
          throw new Error('La subcategoría ya existe');
        }
      })
    );
  }

  // Método para verificar si la subcategoría es única
  verificarSubcategoriaUnica(subcategoria: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}verificar/${subcategoria}`);
  }
}
