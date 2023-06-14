import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FormWord } from "./models";




export const WordFormAction = createActionGroup(
    {
        source: 'Word Form',
        events: {
            "Submit Word Form": props<{ word: FormWord, groupId: string }>(),

            "Cancel New Word Mode": emptyProps(),
            "Cancel Edit Word": emptyProps(),
        },
    }
)
