import { createReducer, on } from '@ngrx/store';
import { changeTheme, togglePixies } from './app.actions';
import { SettingsPopupAction } from '@app/components/navbar/components/settings-popup/settings-popup.actions';


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
    on(SettingsPopupAction.toggleTestingAgainst, (state) => {
        let newTestAgainst;
        if (state.baseTestingAgainst === TestingAgainstType.TRANSLATION) newTestAgainst = TestingAgainstType.ORIGINAL;
        else newTestAgainst = TestingAgainstType.TRANSLATION;
        return { ...state, baseTestingAgainst: newTestAgainst };
    }),
    on(SettingsPopupAction.changeTheme, (state, payload) => ({ ...state, ...payload })),
);