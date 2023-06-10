import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take, delay, } from 'rxjs/operators';

import { UnknownPageUserAction } from './user.actions';

import firebase from 'firebase/compat/app';




@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private afAuth: AngularFireAuth,
    ) { }

    init$ = createEffect(() => this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => this.afAuth.authState.pipe(take(1))),
        switchMap(authState => {
            if (authState) {
                return of(UnknownPageUserAction.userInitAuthorized({ uid: authState.uid, user: JSON.parse(JSON.stringify(authState)) }))
            } else {
                return of(UnknownPageUserAction.userInitUnauthorized());
            }
        })
    )
    );

    signInUserEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UnknownPageUserAction.userSignInEmail),
            map((action) => action.credentials),
            switchMap((credentials) => from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
                map((res) => {
                    const user = res.user;
                    return UnknownPageUserAction.userSignInEmailSuccess({ uid: user.uid, user: JSON.parse(JSON.stringify(user)) });
                }),
                catchError((error) => {
                    return of(UnknownPageUserAction.userSignInEmailError({ error: error.message }));
                })
            )
            )
        )
    );

    signInUserGoogle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UnknownPageUserAction.userSignInWithGoogle),
            switchMap(() => {
                return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
                    map((res: firebase.auth.UserCredential) => {
                        const user = res.user;
                        return UnknownPageUserAction.userSignInWithGoogleSuccess({ uid: user.uid, user: JSON.parse(JSON.stringify(user)) });
                    }),
                    catchError((error) => {
                        console.log("GOOGLE ERROR", error)

                        return of(UnknownPageUserAction.userSignInWithGoogleError({ error: error.message }));
                    })
                );
            })
        )
    );

    userSignOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UnknownPageUserAction.userSignOut),
            switchMap(() => {
                return from(this.afAuth.signOut()).pipe(
                    map(() => {
                        return UnknownPageUserAction.userSignOutSuccess();
                    }),
                    catchError((error) => {
                        return of(UnknownPageUserAction.userSignOutError({ error: error.message }));
                    })
                );
            })
        )
    );

}