import { Route } from '@angular/router';

import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultsComponent } from './pages/results/results.component';
import { SpellingComponent } from './pages/spelling/spelling.component';

export default [
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'spelling',
    component: SpellingComponent,
  },
  {
    path: 'results',
    component: ResultsComponent,
  }
] as Route[];