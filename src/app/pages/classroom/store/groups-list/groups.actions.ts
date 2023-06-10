import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Group, FireGroup } from './groups.models';

export const GlossaryPageGroupAction = createActionGroup(
    {
        source: 'Glossary Page',
        events: {
            "Read Groups": emptyProps(),
            "Read Groups Success": props<{ groups: Group[] }>(),
            "Read Groups Error": props<{ error: string }>(),

            "Create Group": props<{ group: FireGroup }>(),
            "Create Group Success": props<{ group: Group }>(),
            "Create Group Error": props<{ error: string }>(),

            "Update Group": props<{ group: Group }>(),
            "Update Group Success": props<{
                id: string,
                changes: Partial<Group>
            }>(),
            "Update Group Error": props<{ error: string }>(),

            "Delete Group": props<{ id: string }>(),
            "Delete Group Success": props<{ id: string }>(),
            "Delete Group Error": props<{ error: string }>(),
        },
    }
)
