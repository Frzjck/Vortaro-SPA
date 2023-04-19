import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromGroups from './groups/groups.reducer';
import * as fromWords from './words/words.reducer';
import * as fromUser from './user/user.reducer';
import * as fromApp from './app/app.reducer';

import { GroupsEffects } from './groups';
import { WordsEffects } from './words';
import { UserEffects } from './user';


export interface LexiconState {
    app: fromApp.AppState;
    user: fromUser.UserState;
    words: fromWords.WordsState;
    groups: fromGroups.GroupsState;
}

export const reducers: ActionReducerMap<LexiconState> = {
    app: fromApp.reducer,
    user: fromUser.reducer,
    words: fromWords.reducer,
    groups: fromGroups.reducer,
};

export const effects: any[] = [
    GroupsEffects,
    WordsEffects,
    UserEffects,
];

export const getLexiconState = createFeatureSelector<LexiconState>('lexicon');
