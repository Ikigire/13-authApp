import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthStatus } from '../interfaces';
import { AuthService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() !== AuthStatus.authenticated) {
    return true;
  }

  const url = state.url;
  
  router.navigateByUrl('/dashboard');

  return false;
};
