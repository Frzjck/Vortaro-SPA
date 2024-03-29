import { ExerciseModeType } from '@app/store/app/app.reducer';
import { createActionGroup, emptyProps, props } from '@ngrx/store';



export const SettingsPopupAction = createActionGroup(
    {
        source: 'Settings Popup',
        events: {
            "Toggle Pixies": emptyProps(),
            "Toggle Testing Against": emptyProps(),
            "Change Theme": props<{ activeTheme: string }>(),
            "Change Exercise Mode": props<{ baseExerciseMode: ExerciseModeType }>(),
        },
    }
)