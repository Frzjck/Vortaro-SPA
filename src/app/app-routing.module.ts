import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './pages/homepage/homepage.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SpellingComponent } from './exercises/spelling/spelling.component';
import { TypeTestComponent } from './exercises/type-test/type-test.component';
import { ResultsComponent } from './exercises/results/results.component';
import { GlossaryComponent } from './glossary/glossary.component';


import { LoginComponent } from "./pages/login/login.component";
import { SharedComponent } from './pages/demo/shared/shared.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'shared',
    component: SharedComponent,

  },
  {
    path: 'my-vocabulary',
    component: GlossaryComponent,

  },
  {
    path: 'exercises',
    component: ExercisesComponent,

  },
  {
    path: 'exercises/vocabulary-select',
    component: GlossaryComponent,

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
