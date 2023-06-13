import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import { UnknownPageUserAction } from '@app/store/user/user.actions';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="login">
    <button (click)="uglybtn()"> GOOGLE LOGIN </button>
    <!-- <div><code><pre>{{__authState$ | async | json }}</pre></code></div> -->
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

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  uglybtn() {
    // this.afAuth.authState.pipe(take(1)).subscribe((authState) => {
    //   console.log(JSON.parse(JSON.stringify(authState)));
    // });
    this.store.dispatch(UnknownPageUserAction.userSignInWithGoogle());
  }


}


