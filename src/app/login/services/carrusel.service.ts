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
    return this.http.post<any>(`${this.baseUrl}`, formData);  // Ajusta el endpoint
  }

  createCarrusel(newCarrusel: Carrusel): Observable<Carrusel> {
    return this.http.post<Carrusel>(this.baseUrl, newCarrusel);
  }

  findAllCarruseles(): Observable<Carrusel[]> {
    return this.http.get<Carrusel[]>(this.baseUrl);
  }

  removeCarrusel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
