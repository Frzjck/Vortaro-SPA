import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Group } from './groups.models';
import { GlossaryPageAction } from './groups.actions';


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
    on(GlossaryPageAction.readGroups, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageAction.readGroupsSuccess, (state, { groups }) => adapter.setAll(groups, { ...state, loading: false })),
    on(GlossaryPageAction.readGroupsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryPageAction.createGroup, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageAction.createGroupSuccess, (state, { group }) => adapter.addOne(group, { ...state, loading: false })),
    on(GlossaryPageAction.createGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryPageAction.updateGroup, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageAction.updateGroupSuccess, (state, { id, changes }) => (adapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(GlossaryPageAction.updateGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryPageAction.deleteGroup, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageAction.deleteGroupSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(GlossaryPageAction.deleteGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),
);