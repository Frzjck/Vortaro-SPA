import { createAction, props } from '@ngrx/store';
import { User, EmailPasswordCredentials, UserCreateRequest } from './user.models';

export enum Types {
    INIT = '[User] Init: Start',
    INIT_AUTHORIZED = '[User] Init: Authorized',
    INIT_UNAUTHORIZED = '[User] Init: Unauthorized',
    INIT_ERROR = '[User] Init: Error',

    SIGN_IN_EMAIL = '[User] Sign In with email: Start',
    SIGN_IN_EMAIL_SUCCESS = '[User] Sign In with email: Success',
    SIGN_IN_EMAIL_ERROR = '[User] Sign In with email: Error',

    SIGN_UP_EMAIL = '[User] Sign Up with email: Start',
    SIGN_UP_EMAIL_SUCCESS = '[User] Sign Up with email: Success',
    SIGN_UP_EMAIL_ERROR = '[User] Sign Up with email: Error',

    SIGN_OUT = '[User] Sign Out: Start',
    SIGN_OUT_SUCCESS = '[User] Sign Out: Success',
    SIGN_OUT_ERROR = '[User] Sign Out: Error',

    CREATE = '[User] Create: Start',
    CREATE_SUCCESS = '[User] Create: Success',
    CREATE_ERROR = '[User] Create: Error',

    UPDATE = '[User] Update: Start',
    UPDATE_SUCCESS = '[User] Update: Success',
    UPDATE_ERROR = '[User] Update: Error'
}

// Init
export const userInit = createAction(Types.INIT);
export const userInitAuthorized = createAction(Types.INIT_AUTHORIZED, props<{ uid: string, user: User }>);
export const userInitUnauthorized = createAction(Types.INIT_UNAUTHORIZED);
export const userInitError = createAction(Types.INIT_ERROR, props<{ error: string }>);

// Sign In
export const userSignInEmail = createAction(Types.SIGN_IN_EMAIL, props<{ credentials: EmailPasswordCredentials }>);
export const userSignInEmailSuccess = createAction(Types.SIGN_IN_EMAIL_SUCCESS, props<{ uid: string, user: User }>);
export const userSignInEmailError = createAction(Types.SIGN_IN_EMAIL_ERROR, props<{ error: string }>);

export const userSignInWithGoogle = createAction(Types.SIGN_IN_EMAIL, props<{ credentials: EmailPasswordCredentials }>);
export const userSignInWithGoogleSuccess = createAction(Types.SIGN_IN_EMAIL_SUCCESS, props<{ uid: string, user: User }>);
export const userSignInWithGoogleError = createAction(Types.SIGN_IN_EMAIL_ERROR, props<{ error: string }>);

// Sign Up
export const userSignUpEmail = createAction(Types.SIGN_UP_EMAIL, props<{ credentials: EmailPasswordCredentials }>);
export const userSignUpEmailSuccess = createAction(Types.SIGN_UP_EMAIL_SUCCESS, props<{ uid: string }>);
export const userSignUpEmailError = createAction(Types.SIGN_UP_EMAIL_ERROR, props<{ error: string }>);

// Sign Out
export const userSignOut = createAction(Types.SIGN_OUT);
export const userSignOutSuccess = createAction(Types.SIGN_OUT_SUCCESS);
export const userSignOutError = createAction(Types.SIGN_OUT_ERROR, props<{ error: string }>);

// Create
export const userCreate = createAction(Types.CREATE, props<{ user: UserCreateRequest }>);
export const userCreateSuccess = createAction(Types.CREATE_SUCCESS, props<{ user: User }>);
export const userCreateError = createAction(Types.CREATE_ERROR, props<{ error: string }>);

// Update
export const userUpdate = createAction(Types.UPDATE, props<{ user: User }>);
export const userUpdateSuccess = createAction(Types.UPDATE_SUCCESS, props<{ user: User }>);
export const userUpdateError = createAction(Types.UPDATE_ERROR, props<{ error: string }>);