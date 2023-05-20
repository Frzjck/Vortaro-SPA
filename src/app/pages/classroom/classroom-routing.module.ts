import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GlossaryComponent } from './glossary/glossary.component';
import { SpellingComponent } from '@exercises/components/modes/spelling/spelling.component';
import { ResultsComponent } from '@exercises/components/results/results.component';
import { QuizComponent } from '@exercises/components/modes/quiz/quiz.component';

const routes: Routes = [{
  path: 'my-vocabulary',
  component: GlossaryComponent,
},
// If we add here ↓ component property, it will be able to render inside its <router-outlet> components located in loadChildren routes
{
  path: 'exercise-menu',
  loadChildren: () => import('@practice/practice-menu-routing.module')
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
