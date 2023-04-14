import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Group } from './groups.models';
import * as fromActions from './groups.actions';


export const listAdapter = createEntityAdapter<Group>();

export interface ListState extends EntityState<Group> {
    groups: Group[];
    loading: boolean;
    error: string;
}

export const initialState: ListState = listAdapter.getInitialState({
    groups: [],
    loading: null,
    error: null
});

export const groupsReducer = createReducer(
    initialState,
    on(fromActions.readGroups, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.readGroupsSuccess, (state, { groups }) => listAdapter.setAll(groups, { ...state, loading: false })),
    on(fromActions.readGroupsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(fromActions.createGroup, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.createGroupSuccess, (state, { group }) => listAdapter.addOne(group, { ...state, loading: false })),
    on(fromActions.createGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(fromActions.updateGroup, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.updateGroupSuccess, (state, { id, changes }) => (listAdapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(fromActions.updateGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(fromActions.deleteGroup, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.deleteGroupSuccess, (state, { id }) => listAdapter.removeOne(id, state)),
    on(fromActions.deleteGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),
);