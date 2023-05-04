import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './components/modes/quiz/quiz.component';
import { SpellingComponent } from './components/modes/spelling/spelling.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getParams } from '@app/store/router/router.selector';
import { ResultsComponent } from './components/results/results.component';
import { map } from 'rxjs';
import { getExerciseMode, getExerciseStatus } from '@exercises/store/exercises';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, QuizComponent, SpellingComponent, RouterModule, ResultsComponent],
  template: `
    <ng-container *ngIf="(exerciseStatus$ | async) === 'start'" [ngSwitch]="exerciseMode$ | async">
      <app-spelling *ngSwitchCase="'spelling'" />
      <app-quiz *ngSwitchCase="'quiz'" />
    </ng-container>

    <app-results *ngIf="(exerciseStatus$ | async) === 'results'" />
`,
  styles: [],
})
export class ExerciseContainerComponent {

  constructor(private store: Store) { }

  public exerciseMode$ = this.store.select(getExerciseMode);
  public exerciseStatus$ = this.store.select(getExerciseStatus)

  ngOnInit(): void {
    this.exerciseMode$.subscribe(console.log)
  }

}
