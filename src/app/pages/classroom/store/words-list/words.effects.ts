import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom, OnInitEffects } from '@ngrx/effects';

// import * as firestore from "@google-cloud/firestore";
import firebase from "firebase/compat/app";

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';

import { UnknownPageUserAction, selectUserId } from '@app/store/user';
import { UnknownPageWordAction } from './words.actions';
import { Word } from './words.models';
import { WordService } from '@app/pages/classroom/services/word.service';
import { Action, Store } from '@ngrx/store';
import { formWordToNewFireWord, formWordToNewWord } from '../../utils/words.mapper';


@Injectable()
export class WordsEffects {
    constructor(
        private actions$: Actions,
        private afs: AngularFirestore,
        private wordService: WordService,
        private store: Store,
    ) { }

    readInit$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageUserAction.userInitAuthorized, UnknownPageWordAction.readWords),
        concatLatestFrom((action) => [
            this.store.select(selectUserId),
        ]),
        switchMap(([action, uid]) => {
            return this.wordService.getWordsFromServer(uid).pipe(
                take(1),
                map((words: Word[]) => UnknownPageWordAction.readWordsSuccess({ words })),
                catchError(err => of(UnknownPageWordAction.readWordsError(err.message)))
            )
        }
        )
    ));

    create$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageWordAction.createFormWord),
        concatLatestFrom((action) => [
            of(formWordToNewFireWord(action.word)),
            of(action.groupId),
            this.store.select(selectUserId),
        ]),
        switchMap(([action, word, groupId, userId]) =>
            this.wordService.addWordRequest(word, groupId, userId).pipe(
                map(res => (formWordToNewWord(action.word, res.id))),
                map((word: Word) => UnknownPageWordAction.createWordSuccess({ groupId, word })),
                catchError(err => of(UnknownPageWordAction.createWordError(err.message)))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageWordAction.updateWord),
        map((action) => action.word),
        map((word: Word) => ({
            ...word,
            updated: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((word) =>
            from(this.afs.collection('words').doc(word.id).set(word)).pipe(
                map(() => UnknownPageWordAction.updateWordSuccess({ id: word.id, changes: word })),
                catchError(err => of(UnknownPageWordAction.updateWordError(err.message)))
            )
        )
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageWordAction.deleteWord),
        map((action) => action.id),
        switchMap(id =>
            from(this.afs.collection('words').doc(id).delete()).pipe(
                map(() => UnknownPageWordAction.deleteWordSuccess({ id })),
                catchError(err => of(UnknownPageWordAction.deleteWordError(err.message)))
            )
        )
    ));
}
