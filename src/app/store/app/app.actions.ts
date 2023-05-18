import { createActionGroup, props } from '@ngrx/store';
import { Theme } from './app.reducer';


export const ThemeActions = createActionGroup(
    {
        source: 'Theme',
        events: {
            "Set Theme": props<{ name: string }>(),
            "Register Theme": props<{ theme: Theme }>(),
            "Update Theme": props<{ name: string, properties: { [key: string]: string } }>(),
        },
    }
)