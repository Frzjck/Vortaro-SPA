import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { ResultsService } from '@app/services/results.service';
import { Word } from '@app/pages/classroom/store/words-list';
import { Store } from '@ngrx/store';
import { ResultsPageAction, selectExerciseWords, selectResultScores } from '@app/pages/classroom/exercises/store';
import { Observable } from 'rxjs';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, LetDirective],
  template: `
  <ng-container *ngrxLet="resultsArr$ as resultsArr">
  <div class="content" *ngIf="true">
  <h1>Results:</h1>
  <h2>answered correctly {{ countCorrectAnswers(resultsArr)}} out of {{ resultsArr.length }}</h2>
  <div class="container" >
    <mat-card
      *ngFor="let word of currentWordSet$ | async; let i = index"
      class="mat-elevation-z4"
      [ngStyle]="{
        'background-color':
          resultsArr[i] === true
            ? 'var(--answer-correct)'
            : 'var(--answer-wrong)'
      }"
    >
      <span>
        <b>{{ word.original | titlecase }} </b>
        {{ word.translation | titlecase }}
      </span>
    </mat-card>
  </div>
</div>
</ng-container>

`,
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  currentWordSet$: Observable<Word[]>;
  resultsArr$: Observable<Boolean[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.currentWordSet$ = this.store.select(selectExerciseWords);
    this.resultsArr$ = this.store.select(selectResultScores);
  }

  ngOnDestroy(): void {
    this.store.dispatch(ResultsPageAction.resetExerciseState())
  }

  countCorrectAnswers = (arr) => arr.filter((x) => x === true).length;

}
