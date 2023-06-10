import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Word, FireWord } from './words.models';

export const UnknownPageWordAction = createActionGroup(
    {
        source: 'Unknown Page',
        events: {
            "Read Words": emptyProps(),
            "Read Words Success": props<{ words: Word[] }>(),
            "Read Words Error": props<{ error: string }>(),

            "Create Form Word": props<{ word: FireWord, groupId: string }>(),
            "Create Word Success": props<{ groupId: string, word: Word }>(),
            "Create Word Error": props<{ error: string }>(),

            "Update Word": props<{ word: Word }>(),
            "Update Word Success": props<{
                id: string,
                changes: Partial<Word>
            }>(),
            "Update Word Error": props<{ error: string }>(),

            "Delete Word": props<{ id: string }>(),
            "Delete Word Success": props<{ id: string }>(),
            "Delete Word Error": props<{ error: string }>(),
        },
    }
)