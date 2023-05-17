import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const getAppState = createFeatureSelector<AppState>('app');

export const selectIsPixies = createSelector(
    getAppState,
    (app) => app.pixies
);

export const selectActiveTheme = createSelector(
    getAppState,
    (app) => app.activeTheme
);

export const selectAllThemes = createSelector(
    getAppState,
    (app) => app.allThemes
);

export const selectAllExerciseModes = createSelector(
    getAppState,
    (app) => app.allExerciseModes
);