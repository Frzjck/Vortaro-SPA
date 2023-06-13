import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, ROOT_EFFECTS_INIT, concatLatestFrom } from '@ngrx/effects';

import firebase from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';


import { UnknownPageGroupAction } from './groups.actions';
import { UnknownPageUserAction } from '@app/store/user';

import { selectUserId } from '../../../../store/user/user.selectors';


import { extractDocumentChangeActionData } from '@app/shared/utils/db-utils';
import { FireGroup, Group } from './groups.models';
import { Action, Store, select } from '@ngrx/store';


@Injectable()
export class GroupsEffects {

    constructor(
        private actions$: Actions,
        private afs: AngularFirestore,
        private store: Store
    ) { }

    read$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageGroupAction.readGroups),
        concatLatestFrom((action) => [
            this.store.select(selectUserId),
        ]),
        switchMap(([action, uid]) => {
            return this.afs.collection(`/users/${uid}/groups`).snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((groups: Group[]) => UnknownPageGroupAction.readGroupsSuccess({ groups })),
                catchError(err => of(UnknownPageGroupAction.readGroupsError(err.message)))
            )
        }
        )
    ));

    // readInit$ = createEffect(() => this.actions$.pipe(
    //     ofType(UnknownPageUserAction.userInitAuthorized),
    //     switchMap((res) => {
    //         return this.afs.collection(`/users/${res.uid}/groups`).snapshotChanges().pipe(
    //             take(1),
    //             map(changes => changes.map(x => extractDocumentChangeActionData(x))),
    //             map((groups: Group[]) => UnknownPageGroupAction.readGroupsSuccess({ groups })),
    //             catchError(err => of(UnknownPageGroupAction.readGroupsError(err.message)))
    //         )
    //     }
    //     )
    // ));

    create$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageGroupAction.createGroup),
        map((action) => action.group),
        map((group: FireGroup) => ({
            ...group,
            created: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((request: FireGroup) =>
            from(this.afs.collection('groups').add(request)).pipe(
                map(res => ({ ...request, id: res.id })),
                map((group: Group) => UnknownPageGroupAction.createGroupSuccess({ group })),
                catchError(err => of(UnknownPageGroupAction.createGroupError(err.message)))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageGroupAction.updateGroup),
        map((action) => action.group),
        map((group: Group) => ({
            ...group,
            updated: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((group) =>
            from(this.afs.collection('groups').doc(group.id).set(group)).pipe(
                map(() => UnknownPageGroupAction.updateGroupSuccess({ id: group.id, changes: group })),
                catchError(err => of(UnknownPageGroupAction.updateGroupError(err.message)))
            )
        )
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageGroupAction.deleteGroup),
        map((action) => action.id),
        switchMap(id =>
            from(this.afs.collection('groups').doc(id).delete()).pipe(
                map(() => UnknownPageGroupAction.deleteGroupSuccess({ id })),
                catchError(err => of(UnknownPageGroupAction.deleteGroupError(err.message)))
            )
        )
    ));
}
