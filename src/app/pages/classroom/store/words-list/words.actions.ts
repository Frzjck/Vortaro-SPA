import { createAction, props } from '@ngrx/store';
import { Word, FireWord } from './words.models';

export enum Types {

    READ = '[Words] Read: Start',
    READ_SUCCESS = '[Words] Read: Success',
    READ_ERROR = '[Words] Read: Error',

    CREATE = '[Words] Create: Start',
    CREATE_SUCCESS = '[Words] Create: Success',
    CREATE_ERROR = '[Words] Create: Error',

    UPDATE = '[Words] Update: Start',
    UPDATE_SUCCESS = '[Words] Update: Success',
    UPDATE_ERROR = '[Words] Update: Error',

    DELETE = '[Words] Delete: Start',
    DELETE_SUCCESS = '[Words] Delete: Success',
    DELETE_ERROR = '[Words] Delete: Error',
}

// Read
export const readWords = createAction(Types.READ);
export const readWordsSuccess = createAction(Types.READ_SUCCESS, props<{ words: Word[] }>());
export const readWordsError = createAction(Types.READ_ERROR, props<{ error: string }>());


// Create
export const createFormWord = createAction(Types.CREATE, props<{ word: FireWord, groupId: string }>());
export const createWordSuccess = createAction(Types.CREATE_SUCCESS, props<{ word: Word }>());
export const createWordError = createAction(Types.CREATE_ERROR, props<{ error: string }>());


// Update
export const updateWord = createAction(Types.UPDATE, props<{ word: Word }>());
export const updateWordSuccess = createAction(Types.UPDATE_SUCCESS, props<{
    id: string,
    changes: Partial<Word>
}>());
export const updateWordError = createAction(Types.UPDATE_ERROR, props<{ error: string }>());


// Delete
export const deleteWord = createAction(Types.DELETE, props<{ id: string }>());
export const deleteWordSuccess = createAction(Types.DELETE_SUCCESS, props<{ id: string }>());
export const deleteWordError = createAction(Types.DELETE_ERROR, props<{ error: string }>());
