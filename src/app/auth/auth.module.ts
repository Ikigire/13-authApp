import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorMessagesDirective } from './directives/form-error-messages.directive';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    FormErrorMessagesDirective,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
