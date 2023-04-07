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
  user: firebase.User;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    this.user = JSON.parse(localStorage.getItem('user'))
    if (!this.user) {
      this.afAuth.authState.subscribe(user => {
        console.log("GOT THE USER", user)
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      });
    }
  }


  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl("/login");
    });
  }


}
