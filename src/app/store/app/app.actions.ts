import { createAction, props } from '@ngrx/store';

export enum Types {
    CHANGE_EXERCISE_TYPE = '[App] Select Exercise Type',
    CHANGE_TRANSLATE_DIRECTION = '[App] Change Translate Direction',
    CHANGE_THEME = '[App] Change Theme',
    TOGGLE_PIXIES = '[App] Toggle Pixies',
}


export const changeExerciseMode = createAction(Types.CHANGE_EXERCISE_TYPE, props<{ exerciseMode: string }>());

export const toggleTranslateDirection = createAction(Types.CHANGE_EXERCISE_TYPE, props<{ translateDirection: boolean }>());

export const togglePixies = createAction(Types.TOGGLE_PIXIES);

export const changeTheme = createAction(Types.CHANGE_THEME, props<{ theme: string }>());
