import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './components/modes/quiz/quiz.component';
import { SpellingComponent } from './components/modes/spelling/spelling.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ResultsComponent } from './components/results/results.component';
import { ExerciseContainerPageAPI, ExerciseContainerPageAction, getRandomWords, getWorstWords, selectExerciseMode, selectExerciseStatus } from '@exercises/store/exercises';
import { getParams } from '@app/store/router/router.selector';
import { switchCase } from './utils/switchCase';
import { take } from 'rxjs';
import { Word, selectWordsByGroupId } from '@app/pages/classroom/store/words-list';

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

  public exerciseMode$ = this.store.select(selectExerciseMode);
  public exerciseStatus$ = this.store.select(selectExerciseStatus)

  ngOnInit() {
    // once solved, ↓↓↓ can be replaced with a selector and the commented effect located in exercises.effects.ts (?) https://stackoverflow.com/questions/76201795/ngrx-operation-duplicity
    this.store.select(getParams).pipe(
      take(1),
      switchCase(
        [(params) => params.exerciseType === "group", (params) => this.store.select(selectWordsByGroupId(params.groupId))],
        [(params) => params.exerciseType === "mistakes", () => this.store.select(getWorstWords)],
        [(params) => params.exerciseType === "random", () => this.store.select(getRandomWords(Math.random()))],
      )
    ).subscribe((exerciseWords: Word[]) => {
      this.store.dispatch(ExerciseContainerPageAPI.storeExerciseWords({ exerciseWords }))
    })

  }

  ngOnDestroy() {
    this.store.dispatch(ExerciseContainerPageAction.resetExerciseState())
  }

}