import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface'; // Asegúrate de ajustar la importación según tu estructura de archivos

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null; // Inicializa o asigna el usuario actual según tu lógica

  constructor() {}

  getCurrentUser(): Observable<User | null> {
    // Simplemente devuelve el usuario actual o implementa la lógica para obtenerlo
    return of(this.currentUser);
  }
}
