import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const userId = this.getUserIdFromToken(token);
    const userRole = this.getUserRoleFromToken(token);

    if (userRole === 'admin') {
      this.router.navigate(['/admin/inicioadmin']);
    } else if (userRole === 'user') {
      this.router.navigate(['/user/inicio']);
    } else {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  private getUserIdFromToken(token: string): string {
    // Suponiendo que el token es un JWT y está codificado en formato JSON Web Token
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }

  private getUserRoleFromToken(token: string): string {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }
}
