import { createAction, props } from '@ngrx/store';

export enum Types {
    CHANGE_THEME = '[App] Change Theme',
    TOGGLE_PIXIES = '[App] Toggle Pixies',
}


export const togglePixies = createAction(Types.TOGGLE_PIXIES);

export const changeTheme = createAction(Types.CHANGE_THEME, props<{ theme: string }>());
