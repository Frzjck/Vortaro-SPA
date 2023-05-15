import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ExerciseContainerPageAPI, ExerciseContainerPageAction, ExercisePageAction } from "./exercises.actions";
import { map, of } from "rxjs";
import { Store } from "@ngrx/store";
import { getParams } from "@app/store/router/router.selector";
import { switchMap, catchError, tap, take, mergeMap, debounceTime } from 'rxjs/operators';
import { _generateAnswerChoices } from "./store-utils";
import { selectCurrentGroupExerciseWords, getRandomWords, getWorstWords, selectCurrentWord, selectExerciseWords, selectTestingAgainst, TestingAgainstType } from "./exercises.reducer";
import { Word } from "@app/pages/classroom/store/words-list";
import { shuffle } from "../../pages/exercises/utils/shuffleArray";





@Injectable()
export class ExercisesEffects {
    constructor(
        private actions$: Actions,
        private store: Store
    ) { }

    loadAnswerChoices$ = createEffect(() => this.actions$.pipe(
        ofType(ExercisePageAction.loadAnswerChoices),
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


const _generateAnswerChoices = (currentWord: Word, currentWordSet: Word[], testingAgainst: TestingAgainstType): Array<string> => {

    //remove currentWord from word set
    const wrongWords = currentWordSet.filter(x => x.id !== currentWord.id);
    const wrongAnswers = _getAnswers(wrongWords, testingAgainst);
    const correctAnswers = _getAnswers([currentWord], testingAgainst);

    // get 3 random answers from word set
    const wrongAnswersShuffled = shuffle(wrongAnswers);
    const wrongAnswersSlice = wrongAnswersShuffled.slice(0, 3);

    const correctAnswersShuffled = shuffle(correctAnswers);
    const correctAnswersSlice = correctAnswersShuffled.slice(0, 1);


    const presentedAnswers = [...wrongAnswersSlice, ...correctAnswersSlice];
    const shuffledPossibleAnswers = shuffle(presentedAnswers);
    return shuffledPossibleAnswers;
}


const _getAnswers = (words: Word[], testingAgainst): string[] => {
    if (!words[0]) return [];
    if (testingAgainst === TestingAgainstType.ORIGINAL) {
        return words.map(word => word.original);
    }
    console.log(words, words.length)
    if (testingAgainst === TestingAgainstType.TRANSLATION) {
        return words.map(word => {
            if (word?.additionalTr?.length) return [word.translation, ...word?.additionalTr]
            return [word.translation]

        }).flat();
    }
}