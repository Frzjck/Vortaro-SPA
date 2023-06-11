import { Route } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { glossaryFeature } from './store/glossary/glossary.reducer';
import { GlossaryComponent } from './glossary.component';

export default [
    {
        path: '',
        component: GlossaryComponent,
        providers: [
            // provideState(exercisesFeature),
            importProvidersFrom(
                StoreModule.forFeature(glossaryFeature),
                // EffectsModule.forFeature([ExercisesEffects]),
            ),
        ],
    },

] as Route[];
