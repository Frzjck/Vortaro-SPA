import { createReducer, on } from '@ngrx/store';
import { SettingsPopupAction } from '@app/components/navbar/components/settings-popup/settings-popup.actions';
import { ThemeActions } from './app.actions';


export enum ThemeType {
    BLUE = "blue",
    BROWN = "brown"
};

export interface Theme {
    name: string;
    properties: any;
}

export enum ExerciseModeType {
    SPELLING = "spelling",
    QUIZ = "quiz"
};

export enum TestingAgainstType {
    ORIGINAL = "original",
    TRANSLATION = "translation"
};

export interface AppState {
    allThemes: ThemeType[];
    themes: Theme[];
    activeTheme: string;

    pixies: boolean;

    typeOfOS: string;

    baseExerciseMode: ExerciseModeType;
    allExerciseModes: Array<ExerciseModeType>

    baseTestingAgainst: TestingAgainstType;
}

export const initialState: AppState = {
    pixies: true,

    allThemes: [ThemeType.BLUE, ThemeType.BROWN],
    activeTheme: null,
    themes: [],

    typeOfOS: "Windows",

    baseExerciseMode: ExerciseModeType.QUIZ,
    allExerciseModes: [ExerciseModeType.QUIZ, ExerciseModeType.SPELLING],

    baseTestingAgainst: TestingAgainstType.TRANSLATION,
};

export const reducer = createReducer(
    initialState,
    on(SettingsPopupAction.togglePixies, (state) => ({ ...state, pixies: !state.pixies })),
    on(SettingsPopupAction.toggleTestingAgainst, (state) => {
        let newTestAgainst;
        if (state.baseTestingAgainst === TestingAgainstType.TRANSLATION) newTestAgainst = TestingAgainstType.ORIGINAL;
        else newTestAgainst = TestingAgainstType.TRANSLATION;
        return { ...state, baseTestingAgainst: newTestAgainst };
    }),
    on(SettingsPopupAction.changeTheme, SettingsPopupAction.changeExerciseMode, (state, payload) => ({ ...state, ...payload })),



    on(ThemeActions.setTheme, (state, { name }) => ({ ...state, activeTheme: name })),
    on(ThemeActions.registerTheme, (state, { theme }) => ({ ...state, themes: [...state.themes, theme] })),
    on(ThemeActions.updateTheme, (state, { name, properties }) => ({
        ...state,
        themes: state.themes.map(theme => {
            if (theme.name === name) {
                return { ...theme, properties: { ...theme.properties, ...properties } };
            }
            return theme;
        })
    }))
);