import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getLexiconState, LexiconState } from '../index';

import { WordsState, adapter } from './words.reducer';


export const getWordsState = createSelector(
    getLexiconState,
    (state: LexiconState) => state.words
);

// selectIds: Returns an array of the IDs of all entities in the collection.
// selectAll: Returns an array of all entities in the collection.
// selectTotal: Returns the total number of entities in the collection.
// selectEntities: Returns an object containing all entities in the collection, keyed by their ID.
// selectEntity: Returns a single entity from the collection, based on its ID.
export const { selectAll, selectEntities, selectTotal } = adapter.getSelectors(getWordsState);

export const getWords = createSelector(
    selectAll,
    (words) => words
);

export const getLoading = createSelector(
    getWordsState,
    (state: WordsState) => state.loading
);

export const getIsReady = createSelector(
    selectTotal,
    getLoading,
    (total, loading) => total > 0 && !loading
);

export const getError = createSelector(
    getWordsState,
    (state: WordsState) => state.error
);

export const getWordsByGroupId = (groupId: string) => createSelector(
    getWords,
    (words) => {
        return words?.filter(word => word.groupId === groupId)
    }
);