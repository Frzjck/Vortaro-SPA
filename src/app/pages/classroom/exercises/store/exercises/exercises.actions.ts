import { Word } from '@app/pages/classroom/store/words-list';
import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';


export const ExerciseContainerPageAction = createActionGroup(
    {
        source: 'Exercise Page',
        events: {
            Enter: emptyProps(),
            "Exercise Finished": props<{ score: number }>(),
        },
    }
)

export const ExerciseContainerPageAPI = createActionGroup(
    {
        source: 'Exercise Container Page API',
        events: {
            "Store Exercise Words": props<{ exerciseWords: Word[] }>(),
        },
    }
)