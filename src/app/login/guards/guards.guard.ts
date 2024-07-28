import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { LoginService } from '../services/login.service';

export const canActivate: CanActivateFn = () => {
  if ( !localStorage.getItem('token') ) return false;
    const token = localStorage.getItem('token');
    return true
};
export const canMatch: CanMatchFn = (route, segments) => {
  if ( !localStorage.getItem('token') ) return false;
    const token = localStorage.getItem('token');
    return true
};
