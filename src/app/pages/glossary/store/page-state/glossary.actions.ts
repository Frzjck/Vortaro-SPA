import { createAction, props } from '@ngrx/store';

export enum Types {
    ADD_UNFOLDED_WORDS = '[Glossary] Add Unfolded Words',
    REMOVE_UNFOLDED_WORDS = '[Glossary] Remove Unfolded Words',
    CLEAR_UNFOLDED_WORDS = '[Glossary] Clear Unfolded Words List',

    SET_EDITING_GROUP = '[Glossary] Select group to be edited',
    RESET_EDITING_GROUP = '[Glossary] Reset edit group selection',
}

export const addUnfoldedWords = createAction(Types.ADD_UNFOLDED_WORDS, props<{ wordIds: string[] }>());
export const removeUnfoldedWords = createAction(Types.REMOVE_UNFOLDED_WORDS, props<{ wordIds: string[] }>());
export const clearUnfoldedWords = createAction(Types.CLEAR_UNFOLDED_WORDS);

export const setEditingGroup = createAction(Types.SET_EDITING_GROUP, props<{ groupId: string }>());
export const resetEditingGroup = createAction(Types.RESET_EDITING_GROUP);