import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrusel } from '../interfaces/carrusel.interface';

@Injectable({
  providedIn: 'root'
})
export class CarruselService {
  private url: string = 'https://proyectogatewayback-production.up.railway.app/carrusel/upload';

  constructor(private http: HttpClient) { }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.url}upload`, formData);
  }

  createCarrusel(newCarrusel: any): Observable<Carrusel> {
    return this.http.post<Carrusel>(this.url, newCarrusel);
  }

  findAllCarruseles(): Observable<Carrusel[]> {
    return this.http.get<Carrusel[]>(this.url);
  }

  removeCarrusel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}${id}`);
  }
}
