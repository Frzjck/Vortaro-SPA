import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ExerciseContainerPageAPI, ExerciseContainerPageAction } from "./exercises.actions";
import { map, of } from "rxjs";
import { Store } from "@ngrx/store";
import { getParams } from "@app/store/router/router.selector";
import { switchMap, catchError, tap, take, mergeMap } from 'rxjs/operators';
import { switchCase } from "../../pages/exercises/utils/switchCase";
import { selectCurrentGroupExerciseWords, getRandomWords, getWorstWords } from "./exercises.reducers";
import { Word } from "@app/pages/classroom/store/words-list";





@Injectable()
export class ExercisesEffects {
    constructor(
        private actions$: Actions,
        private store: Store
    ) { }

    // storeExerciseWords$ = createEffect(() => this.actions$.pipe(
    //     ofType(ExerciseContainerPageAction.enter),
    //     // switchMap(() => {
    //     //     console.log("▄ switchMap(() => ")
    //     //     return this.store.select(getParams).pipe(
    //     //         take(1),
    //     //         tap((params) => console.log("tap((params) => exerciseType", params.exerciseType)),
    //     //         switchCase(
    //     //             [(params) => params.exerciseType === "group", () => this.store.select(selectCurrentGroupExerciseWords)],
    //     //             [(params) => params.exerciseType === "mistakes", () => this.store.select(getWorstWords)],
    //     //             [(params) => params.exerciseType === "random", () => this.store.select(getRandomWords)],
    //     //         ),
    //     //         catchError((err) => {
    //     //             console.log("ERROR - storeExerciseWords$: ", err);
    //     //             return of([])
    //     //         }
    //     //         )
    //     //     )
    //     // }),
    //     // map((words: Word[]) => {
    //     //     console.log("===>>> map((words: Word[]) =>", words)

    //     //     return ExerciseContainerPageAPI.storeExerciseWords({ exerciseWords: [] })
    //     // })
    // ));

}