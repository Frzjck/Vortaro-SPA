import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ExerciseModeType, ThemeType } from '@app/store/app';


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