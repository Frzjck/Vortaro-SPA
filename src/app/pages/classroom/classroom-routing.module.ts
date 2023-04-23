import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlossaryComponent } from './glossary/glossary.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { SpellingComponent } from './exercises/pages/spelling/spelling.component';
import { ResultsComponent } from './exercises/pages/results/results.component';
import { LoginComponent } from '../login/login.component';
import { TypeTestComponent } from './exercises/pages/type-test/type-test.component';

const routes: Routes = [{
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
  component: TypeTestComponent,

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
