import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.reducer';


export const getAppState = createFeatureSelector<AppState>('app');



export const isPixies = createSelector(
    getAppState,
    (app) => app.pixies
);

export const getTheme = createSelector(
    getAppState,
    (app) => app.activeTheme
);

export const translateDirection = createSelector(
    getAppState,
    (app) => app.translateDirection
);

export const getExerciseType = createSelector(
    getAppState,
    (app) => app.exerciseType
);
