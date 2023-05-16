import { createReducer, on } from '@ngrx/store';
import { changeTheme, togglePixies } from './app.actions';


export enum ThemeType {
    BLUE = "blue",
    BROWN = "brown"
};

export interface AppState {
    pixies: boolean;
    allThemes: Array<ThemeType>
    activeTheme: ThemeType;
    typeOfOS: string;
}

export const initialState: AppState = {
    pixies: false,
    allThemes: [ThemeType.BLUE, ThemeType.BROWN],
    activeTheme: ThemeType.BLUE,
    typeOfOS: "Windows",
};

export const reducer = createReducer(
    initialState,
    on(togglePixies, (state) => ({ ...state, pixies: !state.pixies })),
    on(changeTheme, (state, payload) => ({ ...state, ...payload })),
);