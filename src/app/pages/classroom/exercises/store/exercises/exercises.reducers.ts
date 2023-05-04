import { createReducer, on } from '@ngrx/store';
import * as userActions from '@app/store/user/user.actions';


export interface ExercisesState {
    exerciseMode: string;
    exerciseStatus: string;

    // This option determines what is being tested, your knowledge of meaning of a foreign word if true,
    // and your knowledge of spelling if false
    translateDirection: boolean;

    activeWordIndex: number;
    scoreArr: boolean[]
    correct: boolean;
    pendingFirstSubmit: boolean;
    wordWorthPercent?: number;
}

export const initialState: ExercisesState = {
    exerciseMode: "spell",
    exerciseStatus: "start",

    translateDirection: true,

    activeWordIndex: 0,
    scoreArr: [],
    correct: false,
    pendingFirstSubmit: true,
};

export const exercisesReducer = createReducer(
    initialState,
    // on(userActions.userInitAuthorized, (state) => ({ ...state, exerciseState: "results" })),
);



// on(, (state) => ({ ...state, exerciseState: "start" })),

// on(, (state) => ({ ...state, exerciseMode: "quiz" })),
// on(, (state) => ({ ...state, exerciseMode: "spell" })),

// on(, (state) => ({ ...state, translateDirection: !state.translateDirection })),