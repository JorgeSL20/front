// src/app/services/carrusel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrusel } from '../interfaces/carrusel.interface';

@Injectable({
  providedIn: 'root'
})
export class CarruselService {
  private baseUrl: string = 'https://proyectogatewayback-production.up.railway.app/carrusel';

  constructor(private http: HttpClient) { }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/upload`, formData);
  }

  createCarrusel(newCarrusel: Carrusel): Observable<Carrusel> {
    return this.http.post<Carrusel>(this.baseUrl, newCarrusel);
  }

  findAllCarruseles(): Observable<Carrusel[]> {
    return this.http.get<Carrusel[]>(this.baseUrl);
  }

  // Cambia la firma de la función `removeCarrusel` por la siguiente
removeCarrusel(id: number): Observable<{ message: string }> {
  return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
}

}
