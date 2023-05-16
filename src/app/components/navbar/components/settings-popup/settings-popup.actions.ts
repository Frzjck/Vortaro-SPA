import { ExerciseModeType, TestingAgainstType } from '@app/pages/classroom/exercises/store';
import { ThemeType } from '@app/store/app';
import { createActionGroup, emptyProps, props } from '@ngrx/store';


export const SettingsPopupAction = createActionGroup(
    {
        source: 'Settings Popup',
        events: {
            "Toggle Pixies": emptyProps(),
            "Toggle Testing Against": emptyProps(),
            "Change Theme": props<{ activeTheme: ThemeType }>(),
            "Change Exercise Mode": props<{ exerciseMode: ExerciseModeType }>(),
        },
    }
)