import { Route } from '@angular/router';

import { ExerciseContainerComponent } from './pages/exercises/exercise-container.component';
import { ExerciseMenuComponent } from './exercise-menu.component';
import { SelectGroupComponent } from './pages/select-group/select-group.component';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { exercisesFeatureKey } from './store';
import { exercisesReducer } from './store/exercises/exercises.reducers';

export default [
  {
    path: '',
    component: ExerciseMenuComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(exercisesFeatureKey, exercisesReducer)
      )
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
