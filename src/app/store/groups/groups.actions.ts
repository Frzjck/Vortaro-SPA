import { Action, createAction, props } from '@ngrx/store';
import { Group, FireGroup } from './groups.models';

export enum Types {

    READ = '[Groups] Read: Start',
    READ_SUCCESS = '[Groups] Read: Success',
    READ_ERROR = '[Groups] Read: Error',

    CREATE = '[Groups] Create: Start',
    CREATE_SUCCESS = '[Groups] Create: Success',
    CREATE_ERROR = '[Groups] Create: Error',

    UPDATE = '[Groups] Update: Start',
    UPDATE_SUCCESS = '[Groups] Update: Success',
    UPDATE_ERROR = '[Groups] Update: Error',

    DELETE = '[Groups] Delete: Start',
    DELETE_SUCCESS = '[Groups] Delete: Success',
    DELETE_ERROR = '[Groups] Delete: Error',
}

// Read
export const readGroups = createAction(Types.READ);
export const readGroupsSuccess = createAction(Types.READ_SUCCESS, props<{ groups: Group[] }>());
export const readGroupsError = createAction(Types.READ_ERROR, props<{ error: string }>());

// Create
export const createGroup = createAction(Types.CREATE, props<{ group: FireGroup }>());
export const createGroupSuccess = createAction(Types.CREATE_SUCCESS, props<{ group: Group }>());
export const createGroupError = createAction(Types.CREATE_ERROR, props<{ error: string }>());


// Update
export const updateGroup = createAction(Types.UPDATE, props<{ group: Group }>());
export const updateGroupSuccess = createAction(Types.UPDATE_SUCCESS, props<{
    id: string,
    changes: Partial<Group>
}>());
export const updateGroupError = createAction(Types.UPDATE_ERROR, props<{ error: string }>());


// Delete
export const deleteGroup = createAction(Types.DELETE, props<{ id: string }>());
export const deleteGroupSuccess = createAction(Types.DELETE_SUCCESS, props<{ id: string }>());
export const deleteGroupError = createAction(Types.DELETE_ERROR, props<{ error: string }>());
