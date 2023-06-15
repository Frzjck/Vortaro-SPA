import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FormWord } from "./models";
import { Word } from "@classroom/store/words-list/words.models";




export const WordFormAction = createActionGroup(
    {
        source: 'Word Form',
        events: {
            "Create Word": props<{ word: FormWord, groupId: string }>(),
            "Update Word": props<{ word: FormWord, groupId: string, wordId: string }>(),

            "Cancel New Word Mode": emptyProps(),
            "Cancel Edit Word": emptyProps(),
        },
    }
)

export const WordFormAPIAction = createActionGroup(
    {
        source: 'Word Form API',
        events: {
            "Create Word Success": props<{ groupId: string, word: Word }>(),
            "Create Word Error": props<{ error: string }>(),

            "Update Word Success": props<{ id: string, changes: Partial<Word> }>(),
            "Update Word Error": props<{ error: string }>(),
        },
    }
)
