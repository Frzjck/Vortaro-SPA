import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { Auth, authState, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, UserCredential, signOut } from '@angular/fire/auth';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take, } from 'rxjs/operators';

import { UnknownPageUserAction } from './user.actions';



@Injectable()
export class UserEffects {
    private auth: Auth = inject(Auth);
    authState$ = authState(this.auth);

    constructor(
        private actions$: Actions,
        // private afAuth: AngularFireAuth,
    ) { }

    init$ = createEffect(() => this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => this.authState$.pipe(take(1))),
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
            switchMap((credentials) => from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)).pipe(
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
                return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
                    map((res: UserCredential) => {
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
                return from(signOut(this.auth)).pipe(
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