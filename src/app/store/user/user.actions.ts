import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, EmailPasswordCredentials } from './user.models';

export const UnknownPageUserAction = createActionGroup(
    {
        source: 'Unknown Page',
        events: {
            "User Init": emptyProps(),
            "User Init Authorized": props<{ uid: string, user: User }>(),
            "User Init Unauthorized": emptyProps(),
            "User Init Error": props<{ error: string }>(),

            "User Sign In Email": props<{ credentials: EmailPasswordCredentials }>(),
            "User Sign In Email Success": props<{ uid: string, user: User }>(),
            "User Sign In Email Error": props<{ error: string }>(),

            "User Sign In With Google": emptyProps(),
            "User Sign In With Google Success": props<{ uid: string, user: User }>(),
            "User Sign In With Google Error": props<{ error: string }>(),

            "User Sign Out": emptyProps(),
            "User Sign Out Success": emptyProps(),
            "User Sign Out Error": props<{ error: string }>(),
        },
    }
)

