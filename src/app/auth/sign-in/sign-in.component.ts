import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition('* => void', [animate('600ms 1000ms', style({ opacity: 0 }))]),
    ]),
    trigger('fadeIn', [
      transition('void => *', [style({ opacity: 0 }), animate('400ms 1700ms')]),
    ]),
  ],
})
export class SignInComponent implements OnInit {
  private authStatusSub: Subscription;
  private errorSub: Subscription;
  passwordMatch: boolean = false;
  captcha = '';
  successSubmit = false;
  errorMessage = '';

  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe();
    this.errorSub = this.authService.errorSubject.subscribe((error) => {
      this.errorMessage = error;
      setTimeout(() => {
        this.errorMessage = '';
      }, 10000);
    });
  }
  onSignup(form: NgForm) {
    if (form.invalid || !this.passwordMatch) {
      return;
    }
    this.authService.successSubmitNewUser = true;
    this.authService.createUser(form.value.email, form.value.password);
  }
  ngOnDestroy() {
    this.captcha = '';
    this.authStatusSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  passwordChecker(password, match) {
    this.passwordMatch = password === match;
  }

  resolved(captchaRes) {
    this.captcha = captchaRes;
  }
}
