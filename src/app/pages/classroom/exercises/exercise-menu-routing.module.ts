import { Route } from '@angular/router';

import { ExerciseContainerComponent } from './pages/exercises/exercise-container.component';
import { ExerciseMenuComponent } from './exercise-menu.component';
import { SelectGroupComponent } from './pages/select-group/select-group.component';

export default [
  {
    path: '',
    component: ExerciseMenuComponent,
  },
  {
    path: 'exercises',
    component: ExerciseContainerComponent,
    loadChildren: () => import('./pages/exercises/exercise-container-routing.module')
  },
  {
    path: 'select-group',
    component: SelectGroupComponent,
  }
] as Route[];