import { Component, OnInit } from '@angular/core';
import { Word } from '@app/models/backend/word';
import { ResultsService } from '@app/services/results.service';

@Component({
  selector: 'app-results',
  template: `
  <div class="content" *ngIf="resultsArr.length > 0">
  <h1>Results:</h1>
  <h2>answered correctly {{ countCorrect }} out of {{ countTotal }}</h2>
  <div class="container">
    <mat-card
      *ngFor="let word of currentWordSet; let i = index"
      class="mat-elevation-z4"
      [ngStyle]="{
        'background-color':
          resultsArr[i] === true
            ? 'var(--answer-correct)'
            : 'var(--answer-wrong)'
      }"
    >
      <span>
        <b>{{ word.name | titlecase }} </b>
        {{ word.translation | titlecase }}
      </span>
    </mat-card>
  </div>
</div>
`,
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  currentWordSet: Word[] = [];
  resultsArr: Boolean[] = [];

  resultInfo;

  countCorrect;
  countTotal;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.resultInfo = this.resultsService.loadResultsInfo();
    [this.currentWordSet, this.resultsArr] = this.resultInfo;

    this.countCorrect = this.resultsArr.filter((el) => el === true).length;
    this.countTotal = this.resultsArr.length;
  }
}
