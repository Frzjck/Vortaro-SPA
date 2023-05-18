import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const getAppState = createFeatureSelector<AppState>('app');

export const selectIsPixies = createSelector(
    getAppState,
    (app) => app.pixies
);



export const selectAllExerciseModes = createSelector(
    getAppState,
    (app) => app.allExerciseModes
);

export const selectBaseExerciseMode = createSelector(
    getAppState,
    (app) => app.baseExerciseMode
);

export const selectBaseTestingAgainst = createSelector(
    getAppState,
    (app) => app.baseTestingAgainst
);




export const selectAllThemes = createSelector(
    getAppState,
    (app) => app.allThemes
);

export const selectThemes = createSelector(
    getAppState,
    (state) => state.themes
);

export const selectActiveThemeName = createSelector(
    getAppState,
    (state) => state.activeTheme
);

export const selectActiveTheme = createSelector(
    selectThemes,
    selectActiveThemeName,
    (themes, activeThemeName) => themes.find(theme => theme.name === activeThemeName)
);

export const selectThemeProperty = (propsName: string) => createSelector(
    selectActiveTheme,
    (activeTheme) => activeTheme ? activeTheme.properties[propsName] : null
);