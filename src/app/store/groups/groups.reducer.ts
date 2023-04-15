import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Group } from './groups.models';
import * as fromActions from './groups.actions';


export const adapter = createEntityAdapter<Group>();

export interface GroupsState extends EntityState<Group> {
    loading: boolean;
    error: string;
}

export const initialState: GroupsState = adapter.getInitialState({
    loading: null,
    error: null
});

export const reducer = createReducer(
    initialState,
    on(fromActions.readGroups, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.readGroupsSuccess, (state, { groups }) => adapter.setAll(groups, { ...state, loading: false })),
    on(fromActions.readGroupsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(fromActions.createGroup, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.createGroupSuccess, (state, { group }) => adapter.addOne(group, { ...state, loading: false })),
    on(fromActions.createGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(fromActions.updateGroup, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.updateGroupSuccess, (state, { id, changes }) => (adapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(fromActions.updateGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(fromActions.deleteGroup, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.deleteGroupSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(fromActions.deleteGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),
);