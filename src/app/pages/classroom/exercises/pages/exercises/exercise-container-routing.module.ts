import { Route } from '@angular/router';

import { QuizComponent } from './pages/modes/quiz/quiz.component';
import { ResultsComponent } from './pages/results/results.component';
import { SpellingComponent } from './pages/modes/spelling/spelling.component';

export default [
  {
    path: 'quiz/:id',
    component: QuizComponent,
  },
  {
    path: 'spelling/:id',
    component: SpellingComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
  }
] as Route[];