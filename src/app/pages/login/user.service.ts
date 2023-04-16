import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import firebase from 'firebase/compat/app';

import { Store } from '@ngrx/store';
import { userSignOut } from "@app/store/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  user: firebase.User;


  constructor(private afAuth: AngularFireAuth, private router: Router, private store: Store) {
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
    this.store.dispatch(userSignOut());
  }
}
