import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string>;
  whoAmI$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    this.pictureUrl$ = afAuth.authState.pipe(
      map((user) => (user ? user.photoURL : null))
    );
    this.whoAmI$ = afAuth.authState;
  }


  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl("/login");
    });
  }


}
