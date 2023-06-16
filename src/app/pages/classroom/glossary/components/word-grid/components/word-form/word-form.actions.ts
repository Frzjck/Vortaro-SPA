import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FormWord } from "./models";




export const WordFormAction = createActionGroup(
    {
        source: 'Word Form',
        events: {
            "Create Word": props<{ formWord: FormWord, groupId: string }>(),
            "Update Word": props<{ formWord: FormWord, groupId: string, wordId: string }>(),

            "Cancel New Word Mode": emptyProps(),
            "Cancel Edit Word": emptyProps(),
        },
    }
)
