import { CanActivateFn, CanMatchFn } from '@angular/router';

export const canActivate: CanActivateFn = () => {
  if (!localStorage.getItem('token')) return false;
  return true;
};

export const canMatch: CanMatchFn = (route, segments) => {
  if (!localStorage.getItem('token')) return false;
  return true;
};