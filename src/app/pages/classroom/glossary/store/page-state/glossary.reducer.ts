import { createReducer, on } from '@ngrx/store';
import { editGroup } from '@app/pages/classroom/store/groups-list';
import { addUnfoldedWords, resetEditingGroup, setEditingGroup } from './glossary.actions';



export interface GlossaryState {
    unfoldedWords: string[];
    editingGroupId: string;
}

export const initialState: GlossaryState = {
    unfoldedWords: [],
    editingGroupId: null,

};

export const reducer = createReducer(
    initialState,
    on(addUnfoldedWords, (state, { wordIds }) => ({ ...state, unfoldedWords: state.unfoldedWords.concat(wordIds) })),

    on(setEditingGroup, (state, { groupId }) => ({ ...state, editingGroupId: groupId })),
    on(resetEditingGroup, (state) => ({ ...state, editingGroupId: initialState.editingGroupId })),

);