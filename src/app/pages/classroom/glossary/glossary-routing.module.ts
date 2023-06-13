import { Route } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { glossaryFeature } from './store/glossary/glossary.reducer';
import { GlossaryComponent } from './glossary.component';
import { EffectsModule } from '@ngrx/effects';
import { GlossaryEffects } from './store/glossary/glossary.effects';

export default [
    {
        path: '',
        component: GlossaryComponent,
        providers: [
            importProvidersFrom(
                StoreModule.forFeature(glossaryFeature),
                EffectsModule.forFeature([GlossaryEffects]),
            ),
        ],
    },

] as Route[];
