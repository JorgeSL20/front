import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanMatch {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getCurrentUserRole();
    if (userRole === 'admin') {
      return true;
    }

    this.router.navigate(['/user/inicio']);
    return false;
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    return this.canActivate(null as any, null as any);
  }
}
