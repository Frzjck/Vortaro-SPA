import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromGroups from './groups/groups.reducer';
import * as fromWords from './words/words.reducer';

import { GroupsEffects } from './groups';
import { WordsEffects } from './words/words.effects';


export interface LexiconState {
    groups: fromGroups.GroupsState;
    words: fromWords.WordsState;
}

export const reducers: ActionReducerMap<LexiconState> = {
    groups: fromGroups.reducer,
    words: fromWords.reducer
};

export const effects: any[] = [
    GroupsEffects,
    WordsEffects
];

export const getLexiconState = createFeatureSelector<LexiconState>('lexicon');
