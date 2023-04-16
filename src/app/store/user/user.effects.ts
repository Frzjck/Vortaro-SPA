import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap, withLatestFrom } from 'rxjs/operators';

import { User } from './user.models';

import * as fromActions from './user.actions';

import { NotificationService } from '@app/services';
import firebase from 'firebase/compat/app';


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
    ) { }

    init$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.userInit),
        switchMap(() => this.afAuth.authState.pipe(take(1))),
        switchMap(authState => {
            if (authState) {
                return this.afs.doc<User>(`users/${authState.uid}`).valueChanges().pipe(
                    take(1),
                    map(user => fromActions.userInitAuthorized({ uid: authState.uid, user })),
                    catchError(err => of(fromActions.userInitError(err.message)))
                );
            } else {
                return of(fromActions.userInitUnauthorized());
            }
        })
    ));

    signInUserEmail$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.userSignInEmail),
        map((action) => action.credentials),
        switchMap((credentials) => {
            return from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
                map((res) => {
                    const user = res.user;
                    return fromActions.userSignInEmailSuccess({ uid: user.uid, user });
                }),
                catchError((error) => {
                    return of(fromActions.userSignInEmailError({ error: error.message }));
                })
            );
        })
    )
    );

    signInUserGoogle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.userSignInWithGoogle),
            switchMap((action) => {
                return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
                    map((credential) => {
                        const user = credential.user;
                        return fromActions.userSignInWithGoogleSuccess({ uid: user.uid, user });
                    }),
                    catchError((error) => {
                        return of(fromActions.userSignInWithGoogleError({ error: error.message }));
                    })
                );
            })
        )
    );

    userSignOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.userSignOut),
            switchMap(() => {
                return from(this.afAuth.signOut()).pipe(
                    map(() => {
                        return fromActions.userSignOutSuccess();
                    }),
                    catchError((error) => {
                        return of(fromActions.userSignOutError({ error: error.message }));
                    })
                );
            })
        )
    );



}