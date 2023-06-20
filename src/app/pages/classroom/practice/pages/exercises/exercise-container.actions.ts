import { Word } from "@app/pages/classroom/store/words-list/words.models"
import { ExerciseModeType, TestingAgainstType } from "@app/store/app/app.reducer"
import { createActionGroup, emptyProps, props } from "@ngrx/store"

export const ExerciseContainerPageAction = createActionGroup(
    {
        source: 'Exercise Page',
        events: {
            Enter: emptyProps(),
            "Reset Exercise State": emptyProps(),
            "Exercise Finished": props<{ score: number }>(),
            "Load Current Settings": emptyProps(),
            "Store Current Settings": props<{
                currentExerciseMode: ExerciseModeType,
                currentTestingAgainst: TestingAgainstType
            }>(),
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