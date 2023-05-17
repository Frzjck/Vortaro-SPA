import { createReducer, on } from '@ngrx/store';
import { changeTheme, togglePixies } from './app.actions';


export enum ThemeType {
    BLUE = "blue",
    BROWN = "brown"
};

export enum ExerciseModeType {
    SPELLING = "spelling",
    QUIZ = "quiz"
};

export enum TestingAgainstType {
    ORIGINAL = "original",
    TRANSLATION = "translation"
};

export interface AppState {
    pixies: boolean;
    allThemes: ThemeType[];
    activeTheme: ThemeType;
    typeOfOS: string;

    baseExerciseMode: ExerciseModeType;
    allExerciseModes: Array<ExerciseModeType>

    baseTestingAgainst: TestingAgainstType;
}

export const initialState: AppState = {
    pixies: false,
    allThemes: [ThemeType.BLUE, ThemeType.BROWN],
    activeTheme: ThemeType.BLUE,
    typeOfOS: "Windows",

    baseExerciseMode: ExerciseModeType.QUIZ,
    allExerciseModes: [ExerciseModeType.QUIZ, ExerciseModeType.SPELLING],

    baseTestingAgainst: TestingAgainstType.TRANSLATION,
};

export const reducer = createReducer(
    initialState,
    on(SettingsPopupAction.togglePixies, (state) => ({ ...state, pixies: !state.pixies })),
    on(changeTheme, (state, payload) => ({ ...state, ...payload })),
    on(SettingsPopupAction.changeTheme, (state, payload) => ({ ...state, ...payload })),
);