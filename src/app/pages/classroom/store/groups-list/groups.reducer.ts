import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Group } from './groups.models';
import { GlossaryPageGroupAction } from './groups.actions';


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
    on(GlossaryPageGroupAction.readGroups, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageGroupAction.readGroupsSuccess, (state, { groups }) => adapter.setAll(groups, { ...state, loading: false })),
    on(GlossaryPageGroupAction.readGroupsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryPageGroupAction.createGroup, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageGroupAction.createGroupSuccess, (state, { group }) => adapter.addOne(group, { ...state, loading: false })),
    on(GlossaryPageGroupAction.createGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryPageGroupAction.updateGroup, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageGroupAction.updateGroupSuccess, (state, { id, changes }) => (adapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(GlossaryPageGroupAction.updateGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryPageGroupAction.deleteGroup, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageGroupAction.deleteGroupSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(GlossaryPageGroupAction.deleteGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),
);