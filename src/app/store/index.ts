import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromUser from './user/user.reducer';
import * as fromApp from './app/app.reducer';

import { UserEffects } from './user';


export interface State {
    app: fromApp.AppState;
    user: fromUser.UserState;
}

export const reducers: ActionReducerMap<State> = {
    app: fromApp.reducer,
    user: fromUser.reducer,
};

export const effects: any[] = [
    UserEffects,
];