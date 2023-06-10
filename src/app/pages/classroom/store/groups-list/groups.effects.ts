import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import firebase from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';


import { GlossaryPageAction } from './groups.actions';
import * as userActions from '../../../../store/user/user.actions';

import { selectUserId } from '../../../../store/user/user.selectors';


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
        ofType(GlossaryPageAction.readGroups),
        switchMap(() => this.store.pipe(select(selectUserId))),
        switchMap((userId) => {
            return this.afs.collection(`/users/${userId}/groups`).snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((groups: Group[]) => GlossaryPageAction.readGroupsSuccess({ groups })),
                catchError(err => of(GlossaryPageAction.readGroupsError(err.message)))
            )
        }
        )
    ));

    readInit$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.userInitAuthorized),
        switchMap((res) => {
            return this.afs.collection(`/users/${res.uid}/groups`).snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((groups: Group[]) => GlossaryPageAction.readGroupsSuccess({ groups })),
                catchError(err => of(GlossaryPageAction.readGroupsError(err.message)))
            )
        }
        )
    ));

    create$ = createEffect(() => this.actions$.pipe(
        ofType(GlossaryPageAction.createGroup),
        map((action) => action.group),
        map((group: FireGroup) => ({
            ...group,
            created: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((request: FireGroup) =>
            from(this.afs.collection('groups').add(request)).pipe(
                map(res => ({ ...request, id: res.id })),
                map((group: Group) => GlossaryPageAction.createGroupSuccess({ group })),
                catchError(err => of(GlossaryPageAction.createGroupError(err.message)))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(GlossaryPageAction.updateGroup),
        map((action) => action.group),
        map((group: Group) => ({
            ...group,
            updated: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((group) =>
            from(this.afs.collection('groups').doc(group.id).set(group)).pipe(
                map(() => GlossaryPageAction.updateGroupSuccess({ id: group.id, changes: group })),
                catchError(err => of(GlossaryPageAction.updateGroupError(err.message)))
            )
        )
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(GlossaryPageAction.deleteGroup),
        map((action) => action.id),
        switchMap(id =>
            from(this.afs.collection('groups').doc(id).delete()).pipe(
                map(() => GlossaryPageAction.deleteGroupSuccess({ id })),
                catchError(err => of(GlossaryPageAction.deleteGroupError(err.message)))
            )
        )
    ));
}
