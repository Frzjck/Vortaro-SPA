import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import { switchMap, debounceTime } from 'rxjs/operators';

import { selectBaseExerciseMode, selectBaseTestingAgainst } from "@app/store/app";
import { ExerciseContainerPageAction, ExercisePageAction } from "./practice.actions";
import { selectCurrentWord, selectExerciseWords, selectCurrentTestingAgainst } from "./practice.reducer";
import { _generateAnswerChoices } from "./store-utils";


@Injectable()
export class ExercisesEffects {
    constructor(
        private actions$: Actions,
        private store: Store
    ) { }

    loadAnswerChoices$ = createEffect(() => this.actions$.pipe(
        ofType(ExercisePageAction.loadAnswerChoices, ExercisePageAction.nextWord),
        debounceTime(1000),
        concatLatestFrom((action) => [
            this.store.select(selectCurrentWord),
            this.store.select(selectExerciseWords),
            this.store.select(selectCurrentTestingAgainst),
        ]),
        switchMap(([action, currentWord, exerciseWords, testingAgainst]) => {
            const answerChoices = _generateAnswerChoices(currentWord, exerciseWords, testingAgainst);
            return of(ExercisePageAction.storeAnswerChoices({ answerChoices }));
        })
    ))

    loadCurrentSettings$ = createEffect(() => this.actions$.pipe(
        ofType(ExerciseContainerPageAction.loadCurrentSettings),
        concatLatestFrom((action) => [
            this.store.select(selectBaseExerciseMode),
            this.store.select(selectBaseTestingAgainst),
        ]),
        switchMap(([action, baseExerciseMode, baseTestingAgainst]) => {
            return of(ExerciseContainerPageAction.storeCurrentSettings({ currentExerciseMode: baseExerciseMode, currentTestingAgainst: baseTestingAgainst }));
        })
    ))
}


