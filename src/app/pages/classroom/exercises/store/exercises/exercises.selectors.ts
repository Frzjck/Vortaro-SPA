import { createSelector } from '@ngrx/store';
import { getExerciseState } from '..';
import { getWords } from '@app/pages/classroom/store/words-list';
import { shuffle } from '../../pages/exercises/utils/shuffleArray';


export const getTranslateDirection = createSelector(
    getExerciseState,
    (state) => state.translateDirection
);

export const getExerciseMode = createSelector(
    getExerciseState,
    (state) => state.exerciseMode
);

export const getExerciseStatus = createSelector(
    getExerciseState,
    (state) => state.exerciseStatus
);


export const getWorstWords = createSelector(
    getWords,
    (words) => words
        .sort((a, b) => (a.proficiency > b.proficiency ? 1 : -1))
        .slice(0, 15)
);

export const getRandomWords = (seed) => createSelector(
    getWords,
    (words) => shuffle(words).slice(0, 15)
);
