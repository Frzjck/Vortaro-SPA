import { User } from './user.models';
import * as fromActions from './user.actions';
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
    on(fromActions.userInit, (state) => ({ ...state, loading: true })),
    on(fromActions.userInitAuthorized, (state, { uid, user }) => ({ ...state, user: user, uid: uid, loading: false, error: null })),
    on(fromActions.userInitUnauthorized, (state) => ({ ...state, user: null, loading: false, error: null })),
    on(fromActions.userInitError, (state, { error }) => ({ ...state, loading: false, error })),

    // Sign In Email
    on(fromActions.userSignInEmail, (state) => ({ ...state, loading: true })),
    on(fromActions.userSignInEmailSuccess, (state, { uid, user }) => ({ ...state, uid, user: user, loading: false, error: null })),
    on(fromActions.userSignInEmailError, (state, { error }) => ({ ...state, loading: false, error })),

    // Sign In Google
    on(fromActions.userSignInWithGoogle, (state) => ({ ...state, loading: true })),
    on(fromActions.userSignInWithGoogleSuccess, (state, { uid, user }) => ({ ...state, uid, user: user, loading: false, error: null })),
    on(fromActions.userSignInWithGoogleError, (state, { error }) => ({ ...state, loading: false, error })),

    // Sign Out
    on(fromActions.userSignOut, (state) => ({ ...state, loading: true })),
    on(fromActions.userSignOutSuccess, () => ({ ...initialState })),
    on(fromActions.userSignOutError, (state, { error }) => ({ ...state, loading: false, error })),

    // Sign Up
    // on(fromActions.userSignUpEmail, (state) => ({ ...state, loading: true })),
    // on(fromActions.userSignUpEmailSuccess, (state, { uid, user }) => ({ ...state, user: user, uid, loading: false, error: null })),
    // on(fromActions.userSignUpEmailError, (state, { error }) => ({ ...state, loading: false, error })),

);