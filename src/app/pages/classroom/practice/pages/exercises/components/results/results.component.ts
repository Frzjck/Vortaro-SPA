import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Word } from '@classroom/store/words-list/words.models';
import { selectExerciseWords, selectResultScores } from '@practice/store/practice/practice.reducer';
import { ResultsPageAction } from './results.actions';
import { mapResultsForServer } from '../../utils/mapResults';


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
  resultsArr$: Observable<boolean[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.currentWordSet$ = this.store.select(selectExerciseWords);
    this.resultsArr$ = this.store.select(selectResultScores);
    this.currentWordSet$.subscribe((it) => this.resultsArr$.subscribe((it2) => console.log(mapResultsForServer(it, it2))))
  }

  ngOnDestroy(): void {
    this.store.dispatch(ResultsPageAction.resetExerciseState())
  }

  countCorrectAnswers = (arr) => arr.filter((x) => x === true).length;

}
