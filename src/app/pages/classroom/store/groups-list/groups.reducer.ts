import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Group } from './groups.models';
import { UnknownPageGroupAction } from './groups.actions';
import { UnknownPageWordAction } from '../words-list';


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
    on(UnknownPageGroupAction.readGroups, (state) => ({ ...state, loading: true, error: null })),
    on(UnknownPageGroupAction.readGroupsSuccess, (state, { groups }) => adapter.setAll(groups, { ...state, loading: false })),
    on(UnknownPageGroupAction.readGroupsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(UnknownPageGroupAction.createGroup, (state) => ({ ...state, loading: true, error: null })),
    on(UnknownPageGroupAction.createGroupSuccess, (state, { group }) => adapter.addOne(group, { ...state, loading: false })),
    on(UnknownPageGroupAction.createGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(UnknownPageGroupAction.updateGroup, (state) => ({ ...state, loading: true, error: null })),
    on(UnknownPageGroupAction.updateGroupSuccess, (state, { id, changes }) => (adapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(UnknownPageGroupAction.updateGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(UnknownPageWordAction.createWordSuccess, (state, { groupId, word }) => {
        const fireGroup = state.entities[groupId];
        const updatedFireGroup = {
            ...fireGroup,
            wordIds: [...fireGroup.wordIds, word.id],
        };
        return adapter.updateOne({ id: groupId, changes: updatedFireGroup }, state);
    }
    ),

    on(UnknownPageGroupAction.deleteGroup, (state) => ({ ...state, loading: true, error: null })),
    on(UnknownPageGroupAction.deleteGroupSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(UnknownPageGroupAction.deleteGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),
);