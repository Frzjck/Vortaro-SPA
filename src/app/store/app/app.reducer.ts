import { createReducer, on } from '@ngrx/store';
import { changeExerciseType, changeTheme, togglePixies, toggleTranslateDirection } from './app.actions';



export interface AppState {
    pixies: boolean;
    activeTheme: string;
    // This option determines what is being tested, your knowledge of meaning of a foreign word if true,
    // and your knowledge of spelling if false
    translateDirection: boolean;

    exerciseType: string;
}

export const initialState: AppState = {
    pixies: false,
    activeTheme: "blue",
    translateDirection: true,

    exerciseType: "quiz",
};

export const reducer = createReducer(
    initialState,
    on(changeExerciseType, (state, { exerciseType }) => ({ ...state, exerciseType })),
    on(toggleTranslateDirection, (state => ({ ...state, translateDirection: !state.translateDirection }))),
    on(togglePixies, (state) => ({ ...state, pixies: !state.pixies })),
    on(changeTheme, (state, { theme }) => ({ ...state, activeTheme: theme })),
);