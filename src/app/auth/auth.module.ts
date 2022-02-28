import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';

import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from '../gadgets/spinner/spinner.component';

@NgModule({
  declarations: [LoginComponent, SignInComponent, SpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RecaptchaModule,
  ],
})
export class AuthModule {}
