import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as userActions from '@app/store/user/user.actions';
import { Word, selectWordEntities, selectWordsByGroupId } from '@app/pages/classroom/store/words-list';
import { ExerciseContainerPageAPI, ExerciseContainerPageAction, ExercisePageAction, ResultsPageAction } from './exercises.actions';
import { getParams } from '@app/store/router/router.selector';
import { selectWords } from '@app/pages/classroom/store/words-list';
import { shuffle } from '../../pages/exercises/utils/shuffleArray';
import { selectGroupEntities } from '@app/pages/classroom/store/groups-list';

export enum SubmitButtonActionType {
    PROOFREAD = "proofread",
    NEXT = "next"
};

export enum TestingAgainstType {
    ORIGINAL = "original",
    TRANSLATION = "translation"
};

export enum ExerciseModeType {
    SPELLING = "spelling",
    QUIZ = "quiz"
};

export enum ExerciseStatusType {
    START = "start",
    RESULTS = "results"
};

export interface ExercisesState {
    exerciseMode: ExerciseModeType;
    exerciseStatus: ExerciseStatusType;
    randomSeed: number;

    exerciseWords: Word[];

    // This option determines what is being tested, your knowledge of meaning of a foreign word if true,
    // and your knowledge of spelling if false
    testingAgainst: TestingAgainstType;

    activeWordIndex: number;
    isLastAnswerCorrect: boolean;
    submitButtonAction: SubmitButtonActionType;

    // results functionality
    resultScores: boolean[]

    // progress bar functionality
    wordWorthPercent: number;

}

export const initialState: ExercisesState = {
    exerciseMode: ExerciseModeType.SPELLING,
    exerciseStatus: ExerciseStatusType.START,
    randomSeed: 0,

    exerciseWords: [],

    testingAgainst: TestingAgainstType.TRANSLATION,

    activeWordIndex: 0,
    resultScores: [],
    isLastAnswerCorrect: null,
    submitButtonAction: SubmitButtonActionType.PROOFREAD,

    wordWorthPercent: null,
};

export const exercisesFeature = createFeature({
    name: "exercises",
    reducer: createReducer(
        initialState,
        // On enter GENERATE SEED, GET RIGHT WORDS
        on(ExerciseContainerPageAction.resetExerciseState, ResultsPageAction.resetExerciseState, () => ({ ...initialState })),
        on(ExerciseContainerPageAction.enter, (state) => ({ ...state, randomSeed: Math.random() })),

        on(ExercisePageAction.saveAnswer, (state, { answer }) => ({ ...state, resultScores: [...state.resultScores, answer], isLastAnswerCorrect: answer })),
        on(ExercisePageAction.nextWord, (state) => {
            let newState;
            if (state.exerciseWords.length - 1 === state.activeWordIndex) {
                newState = { ...state, exerciseStatus: ExerciseStatusType.RESULTS };
            } else {
                newState = { ...state, activeWordIndex: state.activeWordIndex + 1 };
            }
            return newState;
        }),
        on(ExercisePageAction.submitButtonActionToggle, (state) => {
            if (state.submitButtonAction === SubmitButtonActionType.PROOFREAD) {
                return { ...state, submitButtonAction: SubmitButtonActionType.NEXT }
            } else {
                return { ...state, submitButtonAction: SubmitButtonActionType.PROOFREAD }
            }
        }),

        on(ExerciseContainerPageAPI.storeExerciseWords, (state, { exerciseWords }) => ({ ...state, exerciseWords: exerciseWords })),

    ),

    extraSelectors: ({ selectRandomSeed, selectActiveWordIndex, selectExerciseWords }) => ({
        selectCurrentGroupExerciseWords: createSelector(
            getParams,
            selectGroupEntities,
            selectWordEntities,
            (params, groupEntities, wordEntities) => {
                let wordIds = groupEntities[params.groupId].wordIds;
                return wordIds.map(wordId => wordEntities[wordId])
            }
        ),

        getWorstWords: createSelector(
            selectWords,
            (words) => words
                .sort((a, b) => (a.proficiency > b.proficiency ? 1 : -1))
                .slice(0, 15)
        ),

        getRandomWords: (_) => createSelector(
            selectWords,
            selectRandomSeed,
            (words) => {
                return shuffle(words).slice(0, 15)
            }
        ),


        getCurrentWord: createSelector(
            selectActiveWordIndex,
            selectExerciseWords,
            (activeWordIndex, exerciseWords) => exerciseWords[activeWordIndex]
        ),
    }),

});


export const {
    name, // feature name
    reducer, // feature reducer
    selectExercisesState, // feature selector
    selectTestingAgainst,
    selectExerciseMode,
    selectExerciseStatus,
    selectRandomSeed,
    selectExerciseWords,
    selectActiveWordIndex,
    selectIsLastAnswerCorrect,
    selectSubmitButtonAction,
    selectResultScores,
    selectWordWorthPercent,
    getRandomWords,
    getWorstWords,
    selectCurrentGroupExerciseWords,
    getCurrentWord
} = exercisesFeature;


// on(, (state) => ({ ...state, exerciseState: "start" })),

// on(, (state) => ({ ...state, exerciseMode: "quiz" })),
// on(, (state) => ({ ...state, exerciseMode: "spell" })),

// on(, (state) => ({ ...state, translateDirection: !state.translateDirection })),