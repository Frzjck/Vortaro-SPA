import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlossaryComponent } from './glossary/glossary.component';
import { ExerciseMenuComponent } from './exercises/exercise-menu.component';
import { SpellingComponent } from './exercises/pages/spelling/spelling.component';
import { ResultsComponent } from './exercises/pages/results/results.component';
import { QuizComponent } from './exercises/pages/quiz/quiz.component';

const routes: Routes = [{
  path: 'my-vocabulary',
  component: GlossaryComponent,
},
{
  path: 'exercises',
  component: ExerciseMenuComponent,

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
