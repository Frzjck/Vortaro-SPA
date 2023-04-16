import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromGroups from './groups/groups.reducer';
import * as fromWords from './words/words.reducer';
import * as fromUser from './user/user.reducer';

import { GroupsEffects } from './groups';
import { WordsEffects } from './words';
import { UserEffects } from './user';


export interface LexiconState {
    groups: fromGroups.GroupsState;
    words: fromWords.WordsState;
    user: fromUser.UserState;
}

export const reducers: ActionReducerMap<LexiconState> = {
    groups: fromGroups.reducer,
    words: fromWords.reducer,
    user: fromUser.reducer
};

export const effects: any[] = [
    GroupsEffects,
    WordsEffects,
    UserEffects
];

export const getLexiconState = createFeatureSelector<LexiconState>('lexicon');
