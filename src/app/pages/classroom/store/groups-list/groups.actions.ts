import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Group, FireGroup } from './groups.models';

export const GroupAPIResponseAction = createActionGroup(
    {
        source: 'Group API Response',
        events: {
            "Read Groups Success": props<{ groups: Group[] }>(),
            "Read Groups Error": props<{ error: string }>(),

            "Create Group Success": props<{ group: Group }>(),
            "Create Group Error": props<{ error: string }>(),

            "Update Group Success": props<{ id: string, changes: Partial<Group> }>(),
            "Update Group Error": props<{ error: string }>(),

            "Delete Group Success": props<{ id: string }>(),
            "Delete Group Error": props<{ error: string }>(),
        },
    }
)


export const UnknownPageGroupAction = createActionGroup(
    {
        source: 'Unknown Page',
        events: {
            "Read Groups": emptyProps(),
        },
    }
) 