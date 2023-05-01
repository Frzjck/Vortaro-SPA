import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UserState } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
    getUserState,
    (state) => state.user
);

export const getLoading = createSelector(
    getUserState,
    (state) => state.loading
);

export const getIsAuthorized = createSelector(
    getUserState,
    (state) => !!state.uid
);

export const getEmail = createSelector(
    getUserState,
    (state) => state.user.email
);

export const getUserId = createSelector(
    getUser,
    (state) => state.uid
);

