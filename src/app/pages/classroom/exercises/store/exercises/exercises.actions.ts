import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';


export const ExercisePageAction = createActionGroup(
    {
        source: 'Exercise Page',
        events: {
            Enter: emptyProps(),
            "Exercise Finished": props<{ score: number }>(),
        },
    }
)