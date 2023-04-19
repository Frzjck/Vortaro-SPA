import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GlossaryState } from './glossary.reducer';


export const getGlossaryState = createFeatureSelector<GlossaryState>('app');



export const getEditingGroup = createSelector(
    getGlossaryState,
    (state) => state.editingGroupId
);

export const isEditingGroup = createSelector(
    getGlossaryState,
    (state) => !!state.editingGroupId
);
