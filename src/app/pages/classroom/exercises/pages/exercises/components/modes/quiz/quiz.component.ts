import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { LetDirective } from '@ngrx/component';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { Store } from '@ngrx/store';
import { selectQuizViewModel } from '@app/pages/classroom/exercises/store/exercises/exercises.selectors';


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, LetDirective, MatCardModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  vm$;
  // Answer config
  selectedOptionValue: string;
  confirmedResponse: string;
  correctResponse: string;

  fourAnswers: string[];
  correctAnswers: string[];
  randomCorrect: string;


  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.vm$ = this.store.select(selectQuizViewModel);
  }


  // updateQuizzOptions() {
  //   if (this.translateDirection) {
  //     this.fourAnswers = this.words
  //       .filter((word) => word !== this.activeWord)
  //       .reduce((acc, cur) => {
  //         acc.push(cur.translation);
  //         acc.push(...cur.additionalTr);
  //         return acc;
  //       }, []);
  //     this.fourAnswers = this.wordService.shuffle(this.fourAnswers).slice(0, 3);
  //     this.correctAnswers = [
  //       ...this.activeWord.additionalTr.map((x) => x.toLowerCase()),
  //       this.activeWord.translation.toLowerCase(),
  //     ];

  //     [this.correctResponse] = this.wordService
  //       .shuffle(this.correctAnswers)
  //       .slice(0, 1);

  //     this.fourAnswers.push(this.correctResponse);
  //     this.fourAnswers = this.wordService.shuffle(this.fourAnswers);
  //   }
  //   if (!this.translateDirection) {
  //     this.fourAnswers = this.words
  //       .filter((word) => word !== this.activeWord)
  //       .map((word) => word.name);
  //     this.fourAnswers = this.wordService.shuffle(this.fourAnswers).slice(0, 3);
  //     this.fourAnswers.push(this.activeWord.name);
  //     this.fourAnswers = this.wordService.shuffle(this.fourAnswers);
  //   }
  // }

}
