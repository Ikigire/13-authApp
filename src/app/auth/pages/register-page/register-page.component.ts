import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { EmailAvailabilityValidator, FormsValiatorService } from '../../validators';

@Component({
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)
  private formValidatorService = inject(FormsValiatorService);
  private eas = inject(EmailAvailabilityValidator);

  seePassword = false;
  seeVerPassword = false;

  registerForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    email: ['', [ Validators.required, Validators.pattern(this.formValidatorService.emailPattern) ],  [ this.eas ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ] ],
    verPassword: ['', [ Validators.required, Validators.minLength(6) ] ],
  },
  {
    validators: [
      this.formValidatorService.arePasswordsEquals('password', 'verPassword'),
    ]
  })

  fieldWasTouched( field: string): boolean {
    return this.registerForm.get(field)?.touched ?? false;
  }

  register(): void {
    const {verPassword, ...user} = this.registerForm.value;
    this.authService.register(user)
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
