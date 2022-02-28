import { Injectable } from '@angular/core';
import { Word } from '../models/word-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  currentWordSet: Word[] = [];
  resultsArr: Boolean[] = [];
  BACKEND_URL = environment.apiUrl;
  formatedResults;
  exMode: string;

  constructor(private http: HttpClient) {}

  saveResultsInfo(resArr, exMode) {
    this.resultsArr = resArr;
    this.exMode = exMode;
    this.formatResults();
    return this.http.put(
      this.BACKEND_URL + '/words/results',
      this.formatedResults
    );
  }

  // Formating results for server
  formatResults() {
    // We differentiate between modes to place cap on maximum score gained by using quizz
    if (this.exMode === 'quiz') {
      return (this.formatedResults = this.currentWordSet
        .map((word, index) => {
          let proficiency = 0;
          if (this.resultsArr[index] && word.proficiency < 14) proficiency = 1;
          if (!this.resultsArr[index] && word.proficiency > 1) proficiency = -1;
          return {
            _id: word.id,
            proficiency: word.proficiency + proficiency,
            group: word.groupNum,
            user: word.user,
          };
        })
        .filter((result) => result !== undefined));
    } else if (this.exMode === 'spelling') {
      return (this.formatedResults = this.currentWordSet
        .map((word, index) => {
          let proficiency = -1;
          if (this.resultsArr[index] && word.proficiency < 20) proficiency = 1;
          if (!this.resultsArr[index] && word.proficiency > 1) proficiency = -1;
          return {
            _id: word.id,
            proficiency: word.proficiency + proficiency,
            group: word.groupNum,
            user: word.user,
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
