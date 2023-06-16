import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Group } from './groups.models';
import { GroupAPIResponseAction, UnknownPageGroupAction } from './groups.actions';
import { WordAPIResponseAction } from '../words-list/words.actions';
import { GroupFormAction } from '../../glossary/components/group-form/group-form.actions';


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
    on(GroupAPIResponseAction.readGroupsSuccess, (state, { groups }) => adapter.setAll(groups, { ...state, loading: false })),
    on(GroupAPIResponseAction.readGroupsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GroupFormAction.createGroup, (state) => ({ ...state, loading: true, error: null })),
    on(GroupAPIResponseAction.createGroupSuccess, (state, { group }) => adapter.addOne(group, { ...state, loading: false })),
    on(GroupAPIResponseAction.createGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GroupFormAction.updateGroup, (state) => ({ ...state, loading: true, error: null })),
    on(GroupAPIResponseAction.updateGroupSuccess, (state, { id, changes }) => (adapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(GroupAPIResponseAction.updateGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(WordAPIResponseAction.createWordSuccess, (state, { groupId, word }) => {
        const fireGroup = state.entities[groupId];
        const updatedFireGroup = {
            ...fireGroup,
            wordIds: [...fireGroup.wordIds, word.id],
        };
        return adapter.updateOne({ id: groupId, changes: updatedFireGroup }, state);
    }
    ),
    on(WordAPIResponseAction.deleteWordSuccess, (state, { wordId, groupId }) => {
        const group = state.entities[groupId];
        const updatedGroup = {
            ...group,
            wordIds: [...group.wordIds.filter(id => id !== wordId)],
        };
        return adapter.updateOne({ id: groupId, changes: updatedGroup }, state);
    }
    ),

    on(UnknownPageGroupAction.deleteGroup, (state) => ({ ...state, loading: true, error: null })),
    on(UnknownPageGroupAction.deleteGroupSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(UnknownPageGroupAction.deleteGroupError, (state, { error }) => ({ ...state, loading: false, error: error })),
);