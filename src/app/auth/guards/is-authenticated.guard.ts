import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
import Swal from 'sweetalert2';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }
  
  if (authService.authStatus() === AuthStatus.checking) {
    return false;
  }


  const url = state.url;
  
  Swal.mixin({
    toast: true,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  }).fire({
    title: 'Atención',
    text: 'Usted no está logeado',
    icon: 'info'
  });


  router.navigateByUrl('/auth/login');

  return false;
};
