// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DataUser } from '../interfaces/dataUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://proyectogatewayback-production.up.railway.app'; // Ajusta según tu URL de backend

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUserId(): number | null {
    const token = this.getToken();
    if (token) {
      return parseInt(token, 10); // Dado que el token es el ID del usuario
    }
    return null;
  }

  getCurrentUserEmail(): Observable<string | null> {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser: DataUser = JSON.parse(user);
      return of(parsedUser.email);
    }
    return of(null);
  }

  // Almacena la información del usuario en el localStorage
  setUser(user: DataUser): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
