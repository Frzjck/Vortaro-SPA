import { Route } from '@angular/router';

import { ExerciseContainerComponent } from './pages/exercises/exercise-container.component';
import { ExerciseMenuComponent } from './exercise-menu.component';
import { SelectGroupComponent } from './pages/select-group/select-group.component';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { exercisesFeature } from './store/exercises/exercises.reducers';
import { importProvidersFrom } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ExercisesEffects } from './store/exercises/exercises.effects';

export default [
  {
    path: '',
    component: ExerciseMenuComponent,
    providers: [
      // provideState(exercisesFeature),
      importProvidersFrom(
        StoreModule.forFeature(exercisesFeature),
        EffectsModule.forFeature([ExercisesEffects]),
      ),
    ],
  },
  {
    path: 'exercises/:exerciseType/:groupId',
    component: ExerciseContainerComponent,
  },
  {
    path: 'select-group',
    component: SelectGroupComponent,
  }
] as Route[];
