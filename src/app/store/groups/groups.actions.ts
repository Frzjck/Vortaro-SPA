import { Action } from '@ngrx/store';
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

export class Read implements Action {
    readonly type = Types.READ;
    constructor() { }
}

export class ReadSuccess implements Action {
    readonly type = Types.READ_SUCCESS;
    constructor(public items: Group[]) { }
}

export class ReadError implements Action {
    readonly type = Types.READ_ERROR;
    constructor(public error: string) { }
}

// Create

export class Create implements Action {
    readonly type = Types.CREATE;
    constructor(public group: FireGroup) { }
}

export class CreateSuccess implements Action {
    readonly type = Types.CREATE_SUCCESS;
    constructor(public group: Group) { }
}

export class CreateError implements Action {
    readonly type = Types.CREATE_ERROR;
    constructor(public error: string) { }
}

// Update

export class Update implements Action {
    readonly type = Types.UPDATE;
    constructor(public group: Group) { }
}

export class UpdateSuccess implements Action {
    readonly type = Types.UPDATE_SUCCESS;
    constructor(
        public id: string,
        public changes: Partial<Group>
    ) { }
}

export class UpdateError implements Action {
    readonly type = Types.UPDATE_ERROR;
    constructor(public error: string) { }
}

// Delete

export class Delete implements Action {
    readonly type = Types.DELETE;
    constructor(public id: string) { }
}

export class DeleteSuccess implements Action {
    readonly type = Types.DELETE_SUCCESS;
    constructor(public id: string) { }
}

export class DeleteError implements Action {
    readonly type = Types.DELETE_ERROR;
    constructor(public error: string) { }
}

export type All
    = Read
    | ReadSuccess
    | ReadError
    | Create
    | CreateSuccess
    | CreateError
    | Update
    | UpdateSuccess
    | UpdateError
    | Delete
    | DeleteSuccess
    | DeleteError;
