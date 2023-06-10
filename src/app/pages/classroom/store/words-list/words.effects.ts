import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';

// import * as firestore from "@google-cloud/firestore";
import firebase from "firebase/compat/app";

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { from, of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';

import { UnknownPageUserAction } from '@app/store/user';
import { GlossaryPageWordAction } from './words.actions';
import { Word } from './words.models';
import { WordService } from '@app/pages/classroom/services/word.service';
import { Store } from '@ngrx/store';
import { selectUserId } from '@app/store/user';
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
        ofType(UnknownPageUserAction.userInitAuthorized),
        switchMap((action) => this.wordService.getWordsFromServer(action.uid).pipe(
            take(1),
            map((words: Word[]) => GlossaryPageWordAction.readWordsSuccess({ words })),
            catchError(err => of(GlossaryPageWordAction.readWordsError(err.message)))
        )
        )
    ));

    //TODO on success store new word, with server side generated id, to local store
    create$ = createEffect(() => this.actions$.pipe(
        ofType(GlossaryPageWordAction.createFormWord),
        concatLatestFrom((action) => [
            of(formWordToNewFireWord(action.word)),
            of(action.groupId),
            this.store.select(selectUserId),
        ]),
        switchMap(([action, word, groupId, userId]) =>
            this.wordService.addWordRequest(word, groupId, userId).pipe(
                map(res => (formWordToNewWord(action.word, res.id))),
                map((word: Word) => GlossaryPageWordAction.createWordSuccess({ word })),
                catchError(err => of(GlossaryPageWordAction.createWordError(err.message)))
            )
        )
    ));

    update$ = createEffect(() => this.actions$.pipe(
        ofType(GlossaryPageWordAction.updateWord),
        map((action) => action.word),
        map((word: Word) => ({
            ...word,
            updated: firebase.firestore.FieldValue.serverTimestamp()
        })),
        switchMap((word) =>
            from(this.afs.collection('words').doc(word.id).set(word)).pipe(
                map(() => GlossaryPageWordAction.updateWordSuccess({ id: word.id, changes: word })),
                catchError(err => of(GlossaryPageWordAction.updateWordError(err.message)))
            )
        )
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(GlossaryPageWordAction.deleteWord),
        map((action) => action.id),
        switchMap(id =>
            from(this.afs.collection('words').doc(id).delete()).pipe(
                map(() => GlossaryPageWordAction.deleteWordSuccess({ id })),
                catchError(err => of(GlossaryPageWordAction.deleteWordError(err.message)))
            )
        )
    ));
}
