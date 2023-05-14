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
    answerLocked: boolean;

    // results functionality
    resultScores: boolean[]

    // progress bar functionality
    wordsCompleted: number;
    answerInput: string;
}

export const initialState: ExercisesState = {
    exerciseMode: ExerciseModeType.QUIZ,
    exerciseStatus: ExerciseStatusType.START,
    randomSeed: 0,

    exerciseWords: [],

    testingAgainst: TestingAgainstType.TRANSLATION,

    activeWordIndex: 0,
    resultScores: [],
    isLastAnswerCorrect: null,
    answerLocked: false,
    wordsCompleted: 0,
    answerInput: "",
};

export const exercisesFeature = createFeature({
    name: "exercises",
    reducer: createReducer(
        initialState,
        // On enter GENERATE SEED, GET RIGHT WORDS
        on(ExerciseContainerPageAction.resetExerciseState, ResultsPageAction.resetExerciseState, () => ({ ...initialState })),
        on(ExerciseContainerPageAction.enter, (state) => ({ ...state, randomSeed: Math.random() })),

        on(ExercisePageAction.addAnswerBoolToResults, (state, { answerBool }) => ({ ...state, resultScores: [...state.resultScores, answerBool], isLastAnswerCorrect: answerBool })),
        on(ExercisePageAction.nextWord, (state) => {
            let newState;
            if (state.exerciseWords.length - 1 === state.activeWordIndex) {
                newState = { ...state, exerciseStatus: ExerciseStatusType.RESULTS };
            } else {
                newState = { ...state, activeWordIndex: state.activeWordIndex + 1, answerInput: initialState.answerInput };
            }
            return newState;
        }),
        on(ExercisePageAction.submitButtonActionToggle, (state) => {
            if (!state.answerLocked) {
                return { ...state, answerLocked: true, wordsCompleted: state.wordsCompleted + 1 }
            } else {
                return { ...state, answerLocked: false }
            }
        }),
        on(ExercisePageAction.updateAnswerInput, (state, { answerInput }) => ({ ...state, answerInput })),
        on(ExercisePageAction.clearAnswerInput, (state) => ({ ...state, answerInput: initialState.answerInput })),
        on(ExercisePageAction.displayCorrectInInput, (state) => ({ ...state, answerInput: "Correct" })),
        on(ExercisePageAction.displayWrongInInput, (state) => ({ ...state, answerInput: "Wrong" })),


        on(ExerciseContainerPageAPI.storeExerciseWords, (state, { exerciseWords }) => ({ ...state, exerciseWords: exerciseWords })),
    ),

    extraSelectors: ({ selectRandomSeed, selectActiveWordIndex, selectExerciseWords, selectWordsCompleted, selectAnswerLocked }) => ({
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


        selectCurrentWord: createSelector(
            selectActiveWordIndex,
            selectExerciseWords,
            (activeWordIndex, exerciseWords): Word => {
                if (exerciseWords) return exerciseWords[activeWordIndex]
            }
        ),


        selectProgress: createSelector(
            selectExerciseWords,
            selectWordsCompleted,
            (exerciseWords, wordsCompleted: number) => {
                return (100 / exerciseWords.length) * wordsCompleted
            }
        ),

        selectIsActionNext: createSelector(
            selectAnswerLocked,
            answerLocked => answerLocked
        ),

        selectIsActionProofread: createSelector(
            selectAnswerLocked,
            answerLocked => !answerLocked
        ),
    }),

});





export const {
    name,
    reducer,
    selectAnswerInput,
    selectExercisesState,
    selectTestingAgainst,
    selectExerciseMode,
    selectWordsCompleted,
    selectExerciseStatus,
    selectRandomSeed,
    selectExerciseWords,
    selectActiveWordIndex,
    selectIsLastAnswerCorrect,
    selectAnswerLocked,
    selectResultScores,
    getRandomWords,
    getWorstWords,
    selectCurrentGroupExerciseWords,
    selectCurrentWord,
    selectProgress,
    selectIsActionNext,
    selectIsActionProofread,
} = exercisesFeature;