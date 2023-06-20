import { User } from './user.models';
import { UnknownPageUserAction } from './user.actions';
import { createReducer, on } from '@ngrx/store';

export interface UserState {
    user: User;
    uid: string;
    userRef: string;
    loading: boolean;
    error: string;
}

const initialState: UserState = {
    user: null,
    uid: null,
    userRef: null,
    loading: null,
    error: null
};

export const reducer = createReducer(
    initialState,

    // Init
    on(UnknownPageUserAction.userInit, (state) => ({ ...state, loading: true })),
    on(UnknownPageUserAction.userInitAuthorized, (state, { uid, user }) => ({ ...state, user: user, uid: uid, loading: false, error: null })),
    on(UnknownPageUserAction.userInitUnauthorized, (state) => ({ ...state, user: null, loading: false, error: null })),
    on(UnknownPageUserAction.userInitError, (state, { error }) => ({ ...state, loading: false, error })),

    // Sign In Email
    on(UnknownPageUserAction.userSignInEmail, (state) => ({ ...state, loading: true })),
    on(UnknownPageUserAction.userSignInEmailSuccess, (state, { uid, user }) => ({ ...state, uid, user: user, loading: false, error: null })),
    on(UnknownPageUserAction.userSignInEmailError, (state, { error }) => ({ ...state, loading: false, error })),

    // Sign In Google
    on(UnknownPageUserAction.userSignInWithGoogle, (state) => ({ ...state, loading: true })),
    on(UnknownPageUserAction.userSignInWithGoogleSuccess, (state, { uid, user }) => ({ ...state, uid, user: user, loading: false, error: null })),
    on(UnknownPageUserAction.userSignInWithGoogleError, (state, { error }) => ({ ...state, loading: false, error })),

    // Sign Out
    on(UnknownPageUserAction.userSignOut, (state) => ({ ...state, loading: true })),
    on(UnknownPageUserAction.userSignOutSuccess, () => ({ ...initialState })),
    on(UnknownPageUserAction.userSignOutError, (state, { error }) => ({ ...state, loading: false, error })),

);