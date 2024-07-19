// auth.service.ts

import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode'; // Si necesitas decodificar más adelante

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

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
}
