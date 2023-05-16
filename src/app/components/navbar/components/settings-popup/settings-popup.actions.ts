import { ExerciseModeType, TestingAgainstType } from '@app/pages/classroom/exercises/store';
import { ThemeType } from '@app/store/app';
import { createActionGroup, emptyProps, props } from '@ngrx/store';


export const SettingsPopupAction = createActionGroup(
    {
        source: 'Settings Popup',
        events: {
            "Toggle Pixies": emptyProps(),
            "Change Exercise Mode": props<{ exerciseMode: ExerciseModeType }>(),
            "Change Theme": props<{ activeTheme: ThemeType }>(),
            "Change What Testing Against": props<{ testingAgainst: TestingAgainstType }>(),
        },
    }
)