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

export interface AppState {
    pixies: boolean;
    allThemes: ThemeType[];
    activeTheme: ThemeType;
    typeOfOS: string;

    exerciseMode: ExerciseModeType;
    allExerciseModes: Array<ExerciseModeType>
}

export const initialState: AppState = {
    pixies: false,
    allThemes: [ThemeType.BLUE, ThemeType.BROWN],
    activeTheme: ThemeType.BLUE,
    typeOfOS: "Windows",

    exerciseMode: ExerciseModeType.QUIZ,
    allExerciseModes: [ExerciseModeType.QUIZ, ExerciseModeType.SPELLING],

};

export const reducer = createReducer(
    initialState,
    on(togglePixies, (state) => ({ ...state, pixies: !state.pixies })),
    on(changeTheme, (state, payload) => ({ ...state, ...payload })),
);