import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import * as firebaseui from "firebaseui";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="login">
	<h2>Sign In</h2>
	<div id="firebaseui-auth-container" class="auth-container"></div>
</div>
  `,
  styles: [`
  .auth-container {
  }
  
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
  }`

  ]
})
export class LoginComponent {
  ui: firebaseui.auth.AuthUI;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.afAuth.app.then((app) => {
      const uiConfig = {
        signInOptions: [
          EmailAuthProvider.PROVIDER_ID,
          GoogleAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
          signInSuccessWithAuthResult: this.onLoginSuccess.bind(this),
        },
      };
      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start("#firebaseui-auth-container", uiConfig);
      this.ui.disableAutoSignIn();
    });
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  onLoginSuccess(result) {
    console.log("Firebase UI result: ", result);
    this.router.navigateByUrl("/courses");
  }
}


