import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

// import * as firestore from "@google-cloud/firestore";
import firebase from "firebase/compat/app";

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';

import * as userActions from '../../../../store/user/user.actions';
import * as wordsActions from './words.actions';
import { extractDocumentChangeActionData } from '@app/shared/utils/db-utils';
import { FireWord, Word } from './words.models';
import { WordService } from '@app/services/word.service';


@Injectable()
export class WordsEffects {

    constructor(
        private actions$: Actions,
        private afs: AngularFirestore,
        private wordService: WordService
    ) { }

    read$ = createEffect(() => this.actions$.pipe(
        ofType(wordsActions.readWords),
        switchMap(() =>
            this.wordService.getWordsFromServer().pipe(
                take(1),
                map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((words: Word[]) => wordsActions.readWordsSuccess({ words })),
                catchError(err => of(wordsActions.readWordsError(err.message)))
            )
        )
    ));

    readInit$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.userInitAuthorized),
        switchMap(() =>
            this.wordService.getWordsFromServer().pipe(
                take(1),
                // map(changes => changes.map(x => extractDocumentChangeActionData(x))),
                map((words: Word[]) => wordsActions.readWordsSuccess({ words })),
                catchError(err => of(wordsActions.readWordsError(err.message)))
            )
        )
    ));

    create$ = createEffect(() => this.actions$.pipe(
        ofType(wordsActions.createWord),
        map((action) => action.word),
        map((word: FireWord) => ({
            ...word,
            created: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((request: FireWord) =>
            from(this.afs.collection('words').add(request)).pipe(
                map(res => ({ ...request, id: res.id })),
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
