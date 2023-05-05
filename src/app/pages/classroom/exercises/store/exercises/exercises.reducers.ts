import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as userActions from '@app/store/user/user.actions';
import { Word } from '@app/pages/classroom/store/words-list';
import { ExerciseContainerPageAPI, ExerciseContainerPageAction } from './exercises.actions';
import { getParams } from '@app/store/router/router.selector';
import { getWords, getWordsByGroupId } from '@app/pages/classroom/store/words-list';
import { shuffle } from '../../pages/exercises/utils/shuffleArray';


export interface ExercisesState {
    exerciseMode: string;
    exerciseStatus: string;
    randomSeed: number;

    exerciseWords: Word[];

    // This option determines what is being tested, your knowledge of meaning of a foreign word if true,
    // and your knowledge of spelling if false
    translateDirection: boolean;

    activeWordIndex: number;
    correct: boolean;
    submitButtonAction: "proofread" | "next";


    // results functionality
    resultScores: boolean[]

    // progress bar functionality
    wordWorthPercent: number;

}

export const initialState: ExercisesState = {
    exerciseMode: "spelling",
    exerciseStatus: "start",
    randomSeed: 0,

    exerciseWords: [],

    translateDirection: true,

    activeWordIndex: 0,
    resultScores: [],
    correct: null,
    submitButtonAction: "proofread",

    wordWorthPercent: null,
};

export const exercisesFeature = createFeature({
    name: "exercises",
    reducer: createReducer(
        initialState,
        // On enter GENERATE SEED, GET RIGHT WORDS
        on(ExerciseContainerPageAction.enter, (state) => ({ ...state, randomSeed: Math.random() })),
        on(ExerciseContainerPageAPI.storeExerciseWords, (state, { exerciseWords }) => ({ ...state, exerciseWords: exerciseWords })),
    ),
    extraSelectors: ({ selectRandomSeed }) => ({
        getCurrentGroupExerciseWords: createSelector(
            getParams,
            params => getWordsByGroupId(params.groupId)
        ),
        getWorstWords: createSelector(
            getWords,
            (words) => words
                .sort((a, b) => (a.proficiency > b.proficiency ? 1 : -1))
                .slice(0, 15)
        ),
        getRandomWords: createSelector(
            getWords,
            selectRandomSeed,
            (words) => shuffle(words).slice(0, 15)
        )
    }),

});


export const {
    name, // feature name
    reducer, // feature reducer
    selectExercisesState, // feature selector
    selectTranslateDirection,
    selectExerciseMode,
    selectExerciseStatus,
    selectRandomSeed,
    selectExerciseWords,
    selectActiveWordIndex,
    selectCorrect,
    selectSubmitButtonAction,
    selectResultScores,
    selectWordWorthPercent,
    getRandomWords,
    getWorstWords,
    getCurrentGroupExerciseWords
} = exercisesFeature;


// on(, (state) => ({ ...state, exerciseState: "start" })),

// on(, (state) => ({ ...state, exerciseMode: "quiz" })),
// on(, (state) => ({ ...state, exerciseMode: "spell" })),

// on(, (state) => ({ ...state, translateDirection: !state.translateDirection })),