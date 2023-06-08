import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take, delay, } from 'rxjs/operators';

import { User } from './user.models';

import * as fromActions from './user.actions';

import firebase from 'firebase/compat/app';
import { Store, select } from '@ngrx/store';
import { selectUserId } from './user.selectors';



@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private db: AngularFirestore,
        private store: Store
    ) { }

    init$ = createEffect(() => this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => this.afAuth.authState.pipe(take(1))),
        switchMap(authState => {
            if (authState) {
                return of(fromActions.userInitAuthorized({ uid: authState.uid, user: JSON.parse(JSON.stringify(authState)) }))
            } else {
                return of(fromActions.userInitUnauthorized());
            }
        })
    )
    );

    signInUserEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.userSignInEmail),
            map((action) => action.credentials),
            switchMap((credentials) => from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
                map((res) => {
                    const user = res.user;
                    return fromActions.userSignInEmailSuccess({ uid: user.uid, user: JSON.parse(JSON.stringify(user)) });
                }),
                catchError((error) => {
                    return of(fromActions.userSignInEmailError({ error: error.message }));
                })
            )
            )
        )
    );

    signInUserGoogle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.userSignInWithGoogle),
            switchMap(() => {
                return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
                    map((res: firebase.auth.UserCredential) => {
                        const user = res.user;
                        return fromActions.userSignInWithGoogleSuccess({ uid: user.uid, user: JSON.parse(JSON.stringify(user)) });
                    }),
                    catchError((error) => {
                        console.log("GOOGLE ERROR", error)

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

    // getUserRef$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(fromActions.userSignInEmailSuccess,
    //             fromActions.userSignInWithGoogle,
    //             fromActions.userInitAuthorized),
    //         switchMap(() => {
    //             this.store.pipe(select(getUserId))

    //             return from(this.afAuth.signOut()).pipe(
    //                 map(() => {
    //                     return fromActions.userSignOutSuccess();
    //                 }),
    //                 catchError((error) => {
    //                     return of(fromActions.userSignOutError({ error: error.message }));
    //                 })
    //             );
    //         })
    //     )
    // );
}