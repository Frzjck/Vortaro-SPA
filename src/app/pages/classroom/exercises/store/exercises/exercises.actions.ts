import { Word } from '@app/pages/classroom/store/words-list';
import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';


export const ExerciseContainerPageAction = createActionGroup(
    {
        source: 'Exercise Page',
        events: {
            Enter: emptyProps(),
            "Reset Exercise State": emptyProps(),
            "Exercise Finished": props<{ score: number }>(),
        },
    }
)
export const ExercisePageAction = createActionGroup(
    {
        source: 'Exercise Page',
        events: {
            "Next Word": emptyProps(),
            "Add Answer Bool To Results": props<{ answerBool: boolean }>(),
            "Word Completed": emptyProps(),
            "Submit Button Action Toggle": emptyProps(),

            "Update Answer Input": props<{ answerInput: string }>(),
            "Clear Answer Input": emptyProps(),
            "Display Correct In Input": emptyProps(),
            "Display Wrong In Input": emptyProps(),
        },
    }
)

export const ResultsPageAction = createActionGroup(
    {
        source: 'Results Page',
        events: {
            "Reset Exercise State": emptyProps(),
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