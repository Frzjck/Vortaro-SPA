import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import firebase from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';


import * as fromGroupsActions from './groups.actions';
import * as fromUserActions from '../user/user.actions';

import { getUserId } from '../user/user.selectors';


import { extractDocumentChangeActionData } from '@app/shared/utils/db-utils';
import { FireGroup, Group } from './groups.models';
import { Store, select } from '@ngrx/store';


@Injectable()
export class GroupsEffects {

    constructor(
        private actions$: Actions,
        private afs: AngularFirestore,
        private store: Store

    ) { }

    read$ = createEffect(() => this.actions$.pipe(
        ofType(fromGroupsActions.readGroups, fromUserActions.userInitAuthorized),
        // switchMap(() => this.store.pipe(select(getUserId))),s
        switchMap((userId) => {
            console.log("USER ID", userId)
            // return this.afs.collection(`/users/${userId}/groups`, ref => ref.orderBy('created')).snapshotChanges().pipe(
            return this.afs.collection(`/users/gTsSvxlF4Cfd0hvxhmT0Y8yAQHXU/groups`, ref => ref.orderBy('created')).snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((groups: Group[]) => fromGroupsActions.readGroupsSuccess({ groups })),
                catchError(err => of(fromGroupsActions.readGroupsError(err.message)))
            )
        }
        )
    ));

    create$ = createEffect(() => this.actions$.pipe(
        ofType(fromGroupsActions.createGroup),
        map((action) => action.group),
        map((group: FireGroup) => ({
            ...group,
            created: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((request: FireGroup) =>
            from(this.afs.collection('groups').add(request)).pipe(
                map(res => ({ ...request, id: res.id })),
                map((group: Group) => fromGroupsActions.createGroupSuccess({ group })),
                catchError(err => of(fromGroupsActions.createGroupError(err.message)))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(fromGroupsActions.updateGroup),
        map((action) => action.group),
        map((group: Group) => ({
            ...group,
            updated: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((group) =>
            from(this.afs.collection('groups').doc(group.id).set(group)).pipe(
                map(() => fromGroupsActions.updateGroupSuccess({ id: group.id, changes: group })),
                catchError(err => of(fromGroupsActions.updateGroupError(err.message)))
            )
        )
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(fromGroupsActions.deleteGroup),
        map((action) => action.id),
        switchMap(id =>
            from(this.afs.collection('groups').doc(id).delete()).pipe(
                map(() => fromGroupsActions.deleteGroupSuccess({ id })),
                catchError(err => of(fromGroupsActions.deleteGroupError(err.message)))
            )
        )
    ));
}
