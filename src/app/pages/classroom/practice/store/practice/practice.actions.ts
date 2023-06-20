import { Word } from '@app/pages/classroom/store/words-list/words.models';
import { ExerciseModeType, TestingAgainstType } from '@app/store/app/app.reducer';
import { createActionGroup, emptyProps, props } from '@ngrx/store';


export const ExercisePageAction = createActionGroup(
    {
        source: 'Exercise Page',
        events: {
            "Next Word": emptyProps(),
            "Add Answer Bool To Results": props<{ answerBool: boolean }>(),
            "Word Completed": emptyProps(),
            "Toggle Answer Lock": emptyProps(),

            "Update Answer Input": props<{ answerInput: string }>(),
            "Clear Answer Input": emptyProps(),
            "Display Correct In Input": emptyProps(),
            "Display Wrong In Input": emptyProps(),

            "Load Answer Choices": emptyProps(),
            "Store Answer Choices": props<{ answerChoices: string[] }>(),
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

