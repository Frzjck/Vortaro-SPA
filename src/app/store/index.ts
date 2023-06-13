import { ActionReducerMap } from '@ngrx/store';

import * as fromUser from './user/user.reducer';
import * as fromApp from './app/app.reducer';

import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { UserEffects } from './user/user.effects';


export interface State {
    app: fromApp.AppState;
    user: fromUser.UserState;
    router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
    app: fromApp.reducer,
    user: fromUser.reducer,
    router: routerReducer,
};

export const effects: any[] = [
    UserEffects,
];