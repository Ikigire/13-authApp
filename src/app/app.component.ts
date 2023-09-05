import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {

      return false;
    }

    return true;
  });

  authStatusChange = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.noAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }

  });
}
