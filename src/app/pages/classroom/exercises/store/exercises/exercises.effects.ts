import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ExercisePageAction } from "./exercises.actions";
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import { switchMap, debounceTime } from 'rxjs/operators';
import { selectCurrentWord, selectExerciseWords, selectTestingAgainst } from "./exercises.reducer";
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
            this.store.select(selectTestingAgainst),
        ]),
        switchMap(([action, currentWord, exerciseWords, testingAgainst]) => {
            const answerChoices = _generateAnswerChoices(currentWord, exerciseWords, testingAgainst);
            return of(ExercisePageAction.storeAnswerChoices({ answerChoices }));
        })
    ))
}


