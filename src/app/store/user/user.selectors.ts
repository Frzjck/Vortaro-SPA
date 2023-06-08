import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
    selectUserState,
    (state) => state.user
);

export const selectLoading = createSelector(
    selectUserState,
    (state) => state.loading
);

export const selectIsAuthorized = createSelector(
    selectUserState,
    (state) => !!state.uid
);

export const selectEmail = createSelector(
    selectUserState,
    (state) => state.user.email
);

export const selectUserId = createSelector(
    selectUser,
    (state) => state.uid
);

