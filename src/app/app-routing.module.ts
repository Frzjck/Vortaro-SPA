import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SpellingComponent } from './exercises/spelling/spelling.component';
import { TypeTestComponent } from './exercises/type-test/type-test.component';
import { ResultsComponent } from './exercises/results/results.component';
import { MyVocabComponent } from './my-vocab/my-vocab.component';


import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'my-vocabulary',
    component: MyVocabComponent,

  },
  {
    path: 'exercises',
    component: ExercisesComponent,

  },
  {
    path: 'exercises/vocabulary-select',
    component: MyVocabComponent,

  },
  // -------- Spelling exercice routes --------
  {
    path: 'exercises/spelling/:type/:id',
    component: SpellingComponent,

  },
  {
    path: 'exercises/spelling/:type/:id/results',
    component: ResultsComponent,

  },
  // -------- Spelling exercice routes END --------
  {
    path: "login",
    component: LoginComponent,
  },

  // -------- Type Test exercice routes --------
  {
    path: 'exercises/quiz/:type/:id',
    component: TypeTestComponent,

  },
  {
    path: 'exercises/quiz/:type/:id/results',
    component: ResultsComponent,

  },
  // -------- Type Test exercice routes END --------
  { path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
