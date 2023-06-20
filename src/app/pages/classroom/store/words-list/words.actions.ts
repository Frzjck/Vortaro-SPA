import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Word } from './words.models';

export const WordAPIResponseAction = createActionGroup(
    {
        source: 'Word API Response',
        events: {
            "Read Words Success": props<{ words: Word[] }>(),
            "Read Words Error": props<{ error: string }>(),

            "Create Word Success": props<{ groupId: string, word: Word }>(),
            "Create Word Error": props<{ error: string }>(),

            "Update Word Success": props<{ wordId: string, changes: Partial<Word> }>(),
            "Update Word Error": props<{ error: string }>(),

            "Delete Word Success": props<{ wordId: string, groupId: string }>(),
            "Delete Word Error": props<{ error: string }>(),
        },
    }
)


//todo delete
export const UnknownPageWordAction = createActionGroup(
    {
        source: 'Unknown Page',
        events: {
            "Read Words": emptyProps(),
        },
    }
) 