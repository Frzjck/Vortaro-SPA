import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Group } from './groups.models';
import { createGroup, createGroupError, createGroupSuccess, deleteGroup, deleteGroupError, deleteGroupSuccess, readGroups, readGroupsError, readGroupsSuccess, updateGroup, updateGroupError, updateGroupSuccess } from './groups.actions';


export const adapter = createEntityAdapter<Group>();

export interface GroupsState extends EntityState<Group> {
    loading: boolean;
    error: string;
}

export const initialState: GroupsState = adapter.getInitialState({
    loading: null,
    error: null,
});

export const reducer = createReducer(
    initialState,
    on(readGroups, (state) => ({ ...state, loading: true, error: null })),
    on(readGroupsSuccess, (state, { groups }) => adapter.setAll(groups, { ...state, loading: false })),
    on(readGroupsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(createGroup, (state) => ({ ...state, loading: true, error: null })),
    on(createGroupSuccess, (state, { group }) => adapter.addOne(group, { ...state, loading: false })),
    on(createGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(updateGroup, (state) => ({ ...state, loading: true, error: null })),
    on(updateGroupSuccess, (state, { id, changes }) => (adapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(updateGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(deleteGroup, (state) => ({ ...state, loading: true, error: null })),
    on(deleteGroupSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(deleteGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),
);