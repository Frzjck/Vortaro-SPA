import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Group } from './groups.models';

export const GroupAPIResponseAction = createActionGroup(
    {
        source: 'Group API Response',
        events: {
            "Read Groups Success": props<{ groups: Group[] }>(),
            "Read Groups Error": props<{ error: string }>(),

            "Create Group Success": props<{ group: Group }>(),
            "Create Group Error": props<{ error: string }>(),

            "Update Group Success": props<{ groupId: string, changes: Partial<Group> }>(),
            "Update Group Error": props<{ error: string }>(),

            "Delete Group Success": props<{ groupId: string }>(),
            "Delete Group Error": props<{ error: string }>(),

            "Cascade Delete Words": emptyProps(),
            "Cascade Delete Words2": props<{ wordIds: string[] }>(),
        },
    }
)


export const UnknownPageGroupAction = createActionGroup(
    {
        source: 'Unknown Page',
        events: {
            "Read Groups": emptyProps(),
            "Delete Group": props<{ groupId: string }>(),
        },
    }
) 