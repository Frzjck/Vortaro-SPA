import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SpellingComponent } from './exercises/spelling/spelling.component';
import { TypeTestComponent } from './exercises/type-test/type-test.component';
import { ResultsComponent } from './exercises/results/results.component';
import { MyVocabComponent } from './my-vocab/my-vocab.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'my-vocabulary',
    component: MyVocabComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exercises',
    component: ExercisesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exercises/vocabulary-select',
    component: MyVocabComponent,
    canActivate: [AuthGuard],
  },
  // -------- Spelling exercice routes --------
  {
    path: 'exercises/spelling/:type/:id',
    component: SpellingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exercises/spelling/:type/:id/results',
    component: ResultsComponent,
    canActivate: [AuthGuard],
  },
  // -------- Spelling exercice routes END --------

  // -------- Type Test exercice routes --------
  {
    path: 'exercises/quiz/:type/:id',
    component: TypeTestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exercises/quiz/:type/:id/results',
    component: ResultsComponent,
    canActivate: [AuthGuard],
  },
  // -------- Type Test exercice routes END --------
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mdl) => mdl.AuthModule),
  },
  { path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
