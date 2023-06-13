import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getLexiconState, LexiconState } from '../index';

import { WordsState, adapter } from './words.reducer';
import { selectGroupEntities } from '../groups-list/groups.selectors';


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

export const selectWords = createSelector(
    selectAll,
    (words) => words
);

export const selectWordEntities = createSelector(
    selectEntities,
    (entities) => entities
);

export const selectIsLoading = createSelector(
    getWordsState,
    (state: WordsState) => state.loading
);

export const selectIsReady = createSelector(
    selectTotal,
    selectIsLoading,
    (total, loading) => total > 0 && !loading
);

export const selectError = createSelector(
    getWordsState,
    (state: WordsState) => state.error
);

export const selectWordsByIds = (wordIds: string[]) => createSelector(
    selectWordEntities,
    (wordEntities) => {
        return wordIds.map(wordId => wordEntities[wordId])
    }
);

export const selectWordsByGroupId = (groupId: string) => createSelector(
    selectWordEntities,
    selectGroupEntities,
    (wordEntities, groupEntities) => {
        let wordIds = groupEntities[groupId]?.wordIds;
        return wordIds?.map(wordId => wordEntities[wordId])
    }
);

export const selectThereAreWords = createSelector(
    selectWords,
    (words) => words.length > 0
);