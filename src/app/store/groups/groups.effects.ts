import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import firebase from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';


import * as fromActions from './groups.actions';
import { extractDocumentChangeActionData } from '@app/shared/utils/db-utils';
import { FireGroup, Group } from './groups.models';


@Injectable()
export class GroupsEffects {

    constructor(
        private actions$: Actions,
        private afs: AngularFirestore
    ) { }

    read$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.readGroups),
        switchMap(() =>
            // , ref => ref.orderBy('created')
            this.afs.collection('/users/gTsSvxlF4Cfd0hvxhmT0Y8yAQHXU/groups').snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((groups: Group[]) => fromActions.readGroupsSuccess({ groups })),
                catchError(err => of(fromActions.readGroupsError(err.message)))
            )
        )
    ));

    create$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.createGroup),
        map((action) => action.group),
        map((group: FireGroup) => ({
            ...group,
            created: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((request: FireGroup) =>
            from(this.afs.collection('groups').add(request)).pipe(
                map(res => ({ ...request, id: res.id })),
                map((group: Group) => fromActions.createGroupSuccess({ group })),
                catchError(err => of(fromActions.createGroupError(err.message)))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.updateGroup),
        map((action) => action.group),
        map((group: Group) => ({
            ...group,
            updated: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((group) =>
            from(this.afs.collection('groups').doc(group.id).set(group)).pipe(
                map(() => fromActions.updateGroupSuccess({ id: group.id, changes: group })),
                catchError(err => of(fromActions.updateGroupError(err.message)))
            )
        )
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.deleteGroup),
        map((action) => action.id),
        switchMap(id =>
            from(this.afs.collection('groups').doc(id).delete()).pipe(
                map(() => fromActions.deleteGroupSuccess({ id })),
                catchError(err => of(fromActions.deleteGroupError(err.message)))
            )
        )
    ));
}
