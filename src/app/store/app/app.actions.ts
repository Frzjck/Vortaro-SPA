import { createActionGroup, props } from '@ngrx/store';


export const ThemeActions = createActionGroup(
    {
        source: 'Theme',
        events: {
            "Set Theme": props<{ name: string }>(),
        },
    }
)