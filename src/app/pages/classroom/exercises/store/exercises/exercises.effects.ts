import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ExerciseContainerPageAPI, ExerciseContainerPageAction } from "./exercises.actions";
import { map, of } from "rxjs";
import { Store } from "@ngrx/store";
import { getParams } from "@app/store/router/router.selector";
import { switchMap } from 'rxjs/operators';
import { switchCase } from "../../pages/exercises/utils/switchCase";
import { getCurrentGroupExerciseWords, getRandomWords, getWorstWords } from "./exercises.reducers";
import { Word } from "@app/pages/classroom/store/words-list";





@Injectable()
export class ExercisesEffects {

    constructor(
        private actions$: Actions,
        private store: Store
    ) { }

    storeExerciseWords$ = createEffect(() => this.actions$.pipe(
        ofType(ExerciseContainerPageAction.enter),
        switchMap(() => {
            console.log("storeExerciseWords triggered")
            return this.store.select(getParams).pipe(
                switchCase(
                    [(params) => params.exerciseType === "group", () => this.store.select(getCurrentGroupExerciseWords)],
                    [(params) => params.exerciseType === "mistakes", () => this.store.select(getWorstWords)],
                    [(params) => params.exerciseType === "random", () => this.store.select(getRandomWords)],
                )
            )
        }),
        switchMap((selector) => this.store.select(selector)),
        map((words: Word[]) => {
            return ExerciseContainerPageAPI.storeExerciseWords({ exerciseWords: words })
        })
    ));

}