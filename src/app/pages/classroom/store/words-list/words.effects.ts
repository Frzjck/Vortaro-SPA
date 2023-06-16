import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom, OnInitEffects } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError, take, tap } from 'rxjs/operators';

import { UnknownPageWordAction, WordAPIResponseAction } from './words.actions';
import { Word } from './words.models';
import { WordService } from '@app/pages/classroom/services/word.service';
import { Store } from '@ngrx/store';
import { formWordToNewFireWord, formWordToNewWord, formWordToUpdatedFireWord, formWordToUpdatedWord } from '../../utils/words.mapper';
import { selectUserId } from '@app/store/user/user.selectors';
import { WordFormAction } from '@glossary/components/word-grid/components/word-form/word-form.actions';
import { GlossaryWordUIAction } from '../../glossary/components/word-grid/components/word-ui/word-ui.actions';



@Injectable()
export class WordsEffects {
    constructor(
        private actions$: Actions,
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
                map((words: Word[]) => WordAPIResponseAction.readWordsSuccess({ words })),
                catchError(err => of(WordAPIResponseAction.readWordsError(err.message)))
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
            this.wordService.addWordRequest(fireWord, userId, groupId).pipe(
                map(res => (formWordToNewWord(formWord, res.id))),
                map((word: Word) => WordAPIResponseAction.createWordSuccess({ groupId, word })),
                catchError(err => of(WordAPIResponseAction.createWordError(err.message)))
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
            this.wordService.updateWordRequest(fireWord, userId, groupId, wordId).pipe(
                map(() => WordAPIResponseAction.updateWordSuccess({ wordId, changes: formWordToUpdatedWord(formWord) })
                ),
                catchError(err => of(WordAPIResponseAction.updateWordError(err.message)))
            )
        )
    ));

    delete$ = createEffect(() => this.actions$.pipe(
        ofType(GlossaryWordUIAction.deleteWord),
        concatLatestFrom(() => [
            this.store.select(selectUserId),
        ]),
        switchMap(([{ wordId, groupId }, userId]) =>
            this.wordService.deleteWordRequest(userId, groupId, wordId).pipe(
                map(() => WordAPIResponseAction.deleteWordSuccess({ wordId })),
                catchError(err => of(WordAPIResponseAction.deleteWordError(err.message)))
            )
        )
    ));
}
