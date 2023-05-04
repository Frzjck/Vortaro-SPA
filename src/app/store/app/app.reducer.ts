import { createReducer, on } from '@ngrx/store';
import { changeTheme, togglePixies } from './app.actions';



export interface AppState {
    pixies: boolean;
    activeTheme: string;
}

export const initialState: AppState = {
    pixies: false,
    activeTheme: "blue",
};

export const reducer = createReducer(
    initialState,
    on(togglePixies, (state) => ({ ...state, pixies: !state.pixies })),
    on(changeTheme, (state, { theme }) => ({ ...state, activeTheme: theme })),
);