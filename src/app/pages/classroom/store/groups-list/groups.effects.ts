import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';


import { GroupAPIResponseAction, UnknownPageGroupAction } from './groups.actions';

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
        private store: Store,
        private groupService: GroupService
    ) { }

    read$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageGroupAction.readGroups),
        concatLatestFrom((action) => [
            this.store.select(selectUserId),
        ]),
        switchMap(([action, uid]) => {
            return this.groupService.getGroupsRequest(uid).pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((groups: Group[]) => GroupAPIResponseAction.readGroupsSuccess({ groups })),
                catchError(err => of(GroupAPIResponseAction.readGroupsError(err.message)))
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
                map((group: Group) => GroupAPIResponseAction.createGroupSuccess({ group })),
                catchError(err => of(GroupAPIResponseAction.createGroupError(err.message)))
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
                map(() => GroupAPIResponseAction.updateGroupSuccess({ groupId, changes: formGroup })),
                catchError(err => of(GroupAPIResponseAction.updateGroupError(err.message)))
            )
        )
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(GlossaryGroupPanelAction.deleteGroup),
        concatLatestFrom((action) => [
            this.store.select(selectUserId),
        ]),
        switchMap(([{ groupId }, userId]) =>
            this.groupService.deleteGroupRequest(userId, groupId).pipe(
                map(() => GroupAPIResponseAction.deleteGroupSuccess({ groupId })),
                catchError(err => of(GroupAPIResponseAction.deleteGroupError(err.message)))
            )
        )
    ));
}
