import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlossaryComponent } from './glossary/glossary.component';
import { SpellingComponent } from './exercises/pages/exercises/components/modes/spelling/spelling.component';
import { ResultsComponent } from './exercises/pages/exercises/components/results/results.component';
import { QuizComponent } from './exercises/pages/exercises/components/modes/quiz/quiz.component';
import { ExerciseMenuComponent } from './exercises/exercise-menu.component';

const routes: Routes = [{
  path: 'my-vocabulary',
  component: GlossaryComponent,
},
// If we add here ↓ component property, it will be able to render inside its <router-outlet> components located in loadChildren routes
{
  path: 'exercise-menu',
  loadChildren: () => import('./exercises/exercise-menu-routing.module')
},
{
  path: 'exercises/vocabulary-select',
  component: GlossaryComponent,

},

// -------- Spelling exercise routes --------
{
  path: 'exercises/spelling/:type/:id',
  component: SpellingComponent,

},
{
  path: 'exercises/spelling/:type/:id/results',
  component: ResultsComponent,

},
// -------- Spelling exercise routes END --------


// -------- Type Test exercise routes --------
{
  path: 'exercises/quiz/:type/:id',
  component: QuizComponent,

},
{
  path: 'exercises/quiz/:type/:id/results',
  component: ResultsComponent,

},
  // -------- Type Test exercise routes END --------

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
