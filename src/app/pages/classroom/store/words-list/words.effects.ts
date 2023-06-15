import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom, OnInitEffects } from '@ngrx/effects';

// import * as firestore from "@google-cloud/firestore";
import firebase from "firebase/compat/app";

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';

import { UnknownPageWordAction } from './words.actions';
import { Word } from './words.models';
import { WordService } from '@app/pages/classroom/services/word.service';
import { Store } from '@ngrx/store';
import { formWordToNewFireWord, formWordToNewWord, formWordToUpdatedFireWord, formWordToUpdatedWord } from '../../utils/words.mapper';
import { selectUserId } from '@app/store/user/user.selectors';
import { WordFormAPIAction, WordFormAction } from '@glossary/components/word-grid/components/word-form/word-form.actions';


@Injectable()
export class WordsEffects {
    constructor(
        private actions$: Actions,
        private afs: AngularFirestore,
        private wordService: WordService,
        private store: Store,
    ) { }

    readInit$ = createEffect(() => this.actions$.pipe(
        ofType(UnknownPageWordAction.readWords),
        concatLatestFrom(() => [
            this.store.select(selectUserId),
        ]),
        switchMap(([, uid]) => {
            return this.wordService.getWordsFromServer(uid).pipe(
                take(1),
                map((words: Word[]) => UnknownPageWordAction.readWordsSuccess({ words })),
                catchError(err => of(UnknownPageWordAction.readWordsError(err.message)))
            )
        }
        )
    ));

    create$ = createEffect(() => this.actions$.pipe(
        ofType(WordFormAction.createWord),
        concatLatestFrom((action) => [
            of(formWordToNewFireWord(action.formWord)),
            this.store.select(selectUserId),
        ]),
        switchMap(([{ formWord, groupId }, fireWord, userId]) =>
            this.wordService.addWordRequest(fireWord, groupId, userId).pipe(
                map(res => (formWordToNewWord(formWord, res.id))),
                map((word: Word) => WordFormAPIAction.createWordSuccess({ groupId, word })),
                catchError(err => of(WordFormAPIAction.createWordError(err.message)))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(WordFormAction.updateWord),
        concatLatestFrom((action) => [
            of(formWordToUpdatedFireWord(action.formWord)),
            this.store.select(selectUserId),
        ]),
        switchMap(([{ formWord, groupId, wordId }, fireWord, userId]) =>
            this.wordService.updateWordRequest(fireWord, groupId, userId, wordId).pipe(
                map(() => WordFormAPIAction.updateWordSuccess({ id: wordId, changes: formWordToUpdatedWord(formWord) })
                ),
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
