import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getLexiconState, LexiconState } from '../index';

import { GroupsState, adapter } from './groups.reducer';

// export const getGroupsState = createFeatureSelector<GroupsState>('groups');

// selectIds: Returns an array of the IDs of all entities in the collection.
// selectAll: Returns an array of all entities in the collection.
// selectTotal: Returns the total number of entities in the collection.
// selectEntities: Returns an object containing all entities in the collection, keyed by their ID.
// selectEntity: Returns a single entity from the collection, based on its ID.
export const { selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const getGroupsState = createSelector(
    getLexiconState,
    (state: LexiconState) => state.groups
);

export const getGroups = createSelector(
    getGroupsState,
    selectAll
);

export const getLoading = createSelector(
    getGroupsState,
    (state) => state.loading
);

export const getIsReady = createSelector(
    selectTotal,
    getLoading,
    (total, loading) => total > 0 && !loading
);

// Since props in selector are deprecated, we can use a factory function to pass the id. This way we allow for better memoization.
export const getGroupById = (id: string) => createSelector(
    selectEntities,
    (entities) => entities[id]
);