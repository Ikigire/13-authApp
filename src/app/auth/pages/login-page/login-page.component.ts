import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  seePassword = false;

  public loginForm: FormGroup = this.fb.group({
    email: ['y@gmail.com', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  login(): void {
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard')
        },
        error: (errMessage) => {
          Swal.mixin({
            toast: true,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).fire({
            title: 'Error',
            text: errMessage,
            icon: 'error'
          });
        }
      });

  }
}
