import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Word } from '@app/store/words';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  currentWordSet: Word[] = [];
  resultsArr: Boolean[] = [];
  BACKEND_URL = "environment.apiUrl";
  formattedResults;
  exMode: string;

  constructor(private http: HttpClient) { }

  saveResultsInfo(resArr, exMode) {
    this.resultsArr = resArr;
    this.exMode = exMode;
    this.formatResults();
    return this.http.put(
      this.BACKEND_URL + '/words/results',
      this.formattedResults
    );
  }

  // Formatting results for server
  formatResults() {
    // We differentiate between modes to place cap on maximum score gained by using quiz
    if (this.exMode === 'quiz') {
      return (this.formattedResults = this.currentWordSet
        .map((word, index) => {
          let proficiency = 0;
          if (this.resultsArr[index] && word.proficiency < 14) proficiency = 1;
          if (!this.resultsArr[index] && word.proficiency > 1) proficiency = -1;
          return {
            _id: word.id,
            proficiency: word.proficiency + proficiency,
          };
        })
        .filter((result) => result !== undefined));
    } else if (this.exMode === 'spelling') {
      return (this.formattedResults = this.currentWordSet
        .map((word, index) => {
          let proficiency = -1;
          if (this.resultsArr[index] && word.proficiency < 20) proficiency = 1;
          if (!this.resultsArr[index] && word.proficiency > 1) proficiency = -1;
          return {
            _id: word.id,
            proficiency: word.proficiency + proficiency,
          };
        })
        .filter((result) => result !== undefined));
    }
  }

  saveWordArr(wordArr) {
    this.currentWordSet = wordArr;
  }

  loadResultsInfo() {
    return [this.currentWordSet, this.resultsArr];
  }
}
