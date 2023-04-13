import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as firestore from "@google-cloud/firestore";
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';


import * as fromActions from './groups.actions';
import { extractDocumentChangeActionData } from '@app/shared/utils/db-utils';
import { FireGroup, Group } from './groups.models';

type Action = fromActions.All;

@Injectable()
export class ListEffects {

    constructor(
        private actions: Actions,
        private afs: AngularFirestore
    ) { }

    read$: Observable<Action> = createEffect(() => this.actions.pipe(
        ofType(fromActions.Types.READ),
        switchMap(() =>
            this.afs.collection('jobs', ref => ref.orderBy('created')).snapshotChanges().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((items: Group[]) => new fromActions.ReadSuccess(items)),
                catchError(err => of(new fromActions.ReadError(err.message)))
            )
        )
    ));

    create$: Observable<Action> = createEffect(() => this.actions.pipe(
        ofType(fromActions.Types.CREATE),
        map((action: fromActions.Create) => action.group),
        map((group: FireGroup) => ({
            ...group,
            created: firestore.FieldValue.serverTimestamp()
        })),
        switchMap((request: FireGroup) =>
            from(this.afs.collection('groups').add(request)).pipe(
                map(res => ({ ...request, id: res.id })),
                map((group: Group) => new fromActions.CreateSuccess(group)),
                catchError(err => of(new fromActions.CreateError(err.message)))
            )
        )
    ));

    update$: Observable<Action> = createEffect(() => this.actions.pipe(
        ofType(fromActions.Types.UPDATE),
        map((action: fromActions.Update) => action.group),
        map((group: Group) => ({
            ...group,
            updated: firestore.FieldValue.serverTimestamp()
        })),
        switchMap((group) =>
            from(this.afs.collection('groups').doc(group.id).set(group)).pipe(
                map(() => new fromActions.UpdateSuccess(group.id, group)),
                catchError(err => of(new fromActions.UpdateError(err.message)))
            )
        )
    ));

    delete$: Observable<Action> = createEffect(() => this.actions.pipe(
        ofType(fromActions.Types.DELETE),
        map((action: fromActions.Delete) => action.id),
        switchMap(id =>
            from(this.afs.collection('groups').doc(id).delete()).pipe(
                map(() => new fromActions.DeleteSuccess(id)),
                catchError(err => of(new fromActions.DeleteError(err.message)))
            )
        )
    ));
}
