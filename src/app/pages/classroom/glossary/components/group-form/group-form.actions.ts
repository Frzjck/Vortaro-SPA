import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FormGroup } from "./models";




export const GroupFormAction = createActionGroup(
    {
        source: 'Group Form',
        events: {
            "Create Group": props<{ formGroup: FormGroup }>(),
            "Update Group": props<{ formGroup: FormGroup, groupId: string }>(),

            "Cancel New Group Mode": emptyProps(),
            "Cancel Rename Group": emptyProps(),
        },
    }
)
