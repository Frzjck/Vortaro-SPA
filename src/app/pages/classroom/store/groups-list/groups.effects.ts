import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';

import firebase from "firebase/compat/app";
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';


import { UnknownPageGroupAction } from './groups.actions';

import { selectUserId } from '../../../../store/user/user.selectors';


import { extractDocumentChangeActionData } from '@app/shared/utils/db-utils';
import { Group } from './groups.models';
import { Store } from '@ngrx/store';
import { GroupFormAction } from '../../glossary/components/group-form/group-form.actions';
import { formGroupToNewFireGroup, formGroupToNewGroup, formGroupToUpdatedFireGroup } from '../../utils/groups.mapper';
import { GroupService } from '../../services/group.service';


@Injectable()
export class GroupsEffects {

    constructor(
        private actions$: Actions,
        private afs: AngularFirestore,
        private store: Store,
        private groupService: GroupService
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


    create$ = createEffect(() => this.actions$.pipe(
        ofType(GroupFormAction.createGroup),
        concatLatestFrom((action) => [
            of(formGroupToNewFireGroup(action.formGroup)),
            this.store.select(selectUserId),
        ]),
        switchMap(([{ formGroup }, fireGroup, userId]) =>
            this.groupService.addGroupRequest(fireGroup, userId).pipe(
                map(res => (formGroupToNewGroup(formGroup, res.id))),
                map((group: Group) => UnknownPageGroupAction.createGroupSuccess({ group })),
                catchError(err => of(UnknownPageGroupAction.createGroupError(err.message)))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(GroupFormAction.updateGroup),
        concatLatestFrom((action) => [
            of(formGroupToUpdatedFireGroup(action.formGroup)),
            this.store.select(selectUserId),
        ]),
        switchMap(([{ formGroup, groupId }, fireGroup, userId]) =>
            this.groupService.updateGroupRequest(fireGroup, userId, groupId).pipe(
                map(() => UnknownPageGroupAction.updateGroupSuccess({ id: groupId, changes: formGroup })),
                catchError(err => of(UnknownPageGroupAction.updateGroupError(err.message)))
            )
        )
    ));

//     delete$ = createEffect(() => this.actions$.pipe(
//         ofType(UnknownPageGroupAction.deleteGroup),
//         concatLatestFrom((action) => [
//             this.store.select(selectUserId),
//         ]),
//         switchMap(([{ groupId }, userId]) =>
//             this.groupService.deleteGroupRequest(userId, groupId).pipe(
//                 map(() => UnknownPageGroupAction.deleteGroupSuccess({ id })),
//                 catchError(err => of(UnknownPageGroupAction.deleteGroupError(err.message)))
//             )
//         )
//     ));
// }
