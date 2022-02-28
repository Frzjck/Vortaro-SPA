import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { Word } from '../../models/word-model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  currentWordSet: Word[] = [];
  resultsArr: Boolean[] = [];

  resultInfo;

  countCorrect;
  countTotal;

  constructor(private resultsService: ResultsService) {}

  ngOnInit(): void {
    this.resultInfo = this.resultsService.loadResultsInfo();
    [this.currentWordSet, this.resultsArr] = this.resultInfo;

    this.countCorrect = this.resultsArr.filter((el) => el === true).length;
    this.countTotal = this.resultsArr.length;
  }
}
