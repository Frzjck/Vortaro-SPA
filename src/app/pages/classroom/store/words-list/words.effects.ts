import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';

// import * as firestore from "@google-cloud/firestore";
import firebase from "firebase/compat/app";

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';

import * as userActions from '../../../../store/user/user.actions';
import * as wordsActions from './words.actions';
import { extractDocumentChangeActionData } from '@app/shared/utils/db-utils';
import { FireWord, Word } from './words.models';
import { WordService } from '@app/pages/classroom/services/word.service';
import { Store } from '@ngrx/store';
import { selectUserId } from '@app/store/user';


@Injectable()
export class WordsEffects {
    constructor(
        private actions$: Actions,
        private afs: AngularFirestore,
        private wordService: WordService,
        private store: Store,
    ) { }

    // read$ = createEffect(() => this.actions$.pipe(
    //     ofType(wordsActions.readWords),
    //     switchMap((action) =>
    //         this.wordService.getWordsFromServer(action.uid).pipe(
    //             take(1),
    //             map(changes => changes.map(x => extractDocumentChangeActionData(x))),
    //             map((words: Word[]) => wordsActions.readWordsSuccess({ words })),
    //             catchError(err => of(wordsActions.readWordsError(err.message)))
    //         )
    //     )
    // ));

    readInit$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.userInitAuthorized),
        switchMap((action) => this.wordService.getWordsFromServer(action.uid).pipe(
            take(1),
            map((words: Word[]) => wordsActions.readWordsSuccess({ words })),
            catchError(err => of(wordsActions.readWordsError(err.message)))
        )
        )
    ));

    //TODO generate proficiency field on server side after exercise results
    //TODO on success store new word, with server side generated id, to local store
    create$ = createEffect(() => this.actions$.pipe(
        ofType(wordsActions.createWord),
        concatLatestFrom((action) => [
            this.store.select(selectUserId),
        ]),
        switchMap(([action, userId]) =>
            from(this.afs.collection(`/users/${userId}/groups/${action.groupId}/words`).add({
                ...action.word,
                created: firebase.firestore.FieldValue.serverTimestamp(),
            })).pipe(
                map(res => ({
                    ...action.word,
                    id: res.id
                })),
                map((word: Word) => wordsActions.createWordSuccess({ word })),
                catchError(err => of(wordsActions.createWordError(err.message)))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(wordsActions.updateWord),
        map((action) => action.word),
        map((word: Word) => ({
            ...word,
            updated: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((word) =>
            from(this.afs.collection('words').doc(word.id).set(word)).pipe(
                map(() => wordsActions.updateWordSuccess({ id: word.id, changes: word })),
                catchError(err => of(wordsActions.updateWordError(err.message)))
            )
        )
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(wordsActions.deleteWord),
        map((action) => action.id),
        switchMap(id =>
            from(this.afs.collection('words').doc(id).delete()).pipe(
                map(() => wordsActions.deleteWordSuccess({ id })),
                catchError(err => of(wordsActions.deleteWordError(err.message)))
            )
        )
    ));
}
