import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import * as userActions from '@app/store/user/user.actions';
import { Word, selectWordEntities, selectWordsByGroupId } from '@app/pages/classroom/store/words-list';
import { ExerciseContainerPageAPI, ExerciseContainerPageAction } from './exercises.actions';
import { getParams } from '@app/store/router/router.selector';
import { selectWords } from '@app/pages/classroom/store/words-list';
import { shuffle } from '../../pages/exercises/utils/shuffleArray';
import { selectGroupEntities } from '@app/pages/classroom/store/groups-list';


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
        on(ExerciseContainerPageAction.resetExerciseState, () => ({ ...initialState })),
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
    selectCurrentGroupExerciseWords,
    getCurrentWord
} = exercisesFeature;


// on(, (state) => ({ ...state, exerciseState: "start" })),

// on(, (state) => ({ ...state, exerciseMode: "quiz" })),
// on(, (state) => ({ ...state, exerciseMode: "spell" })),

// on(, (state) => ({ ...state, translateDirection: !state.translateDirection })),