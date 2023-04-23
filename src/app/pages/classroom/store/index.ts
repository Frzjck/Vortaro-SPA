import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromGroups from './groups-list/groups.reducer';
import * as fromWords from './words-list/words.reducer';

import { GroupsEffects } from './groups-list';
import { WordsEffects } from './words-list';


export interface LexiconState {
    words: fromWords.WordsState;
    groups: fromGroups.GroupsState;
}

export const reducers: ActionReducerMap<LexiconState> = {
    words: fromWords.reducer,
    groups: fromGroups.reducer,
};

export const effects: any[] = [
    GroupsEffects,
    WordsEffects,
];

export const getLexiconState = createFeatureSelector<LexiconState>('lexicon');
