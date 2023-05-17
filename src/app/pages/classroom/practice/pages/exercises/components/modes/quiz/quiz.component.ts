import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { LetDirective } from '@ngrx/component';
import { ProgressBarComponent } from '@exercises/shared/progress-bar/progress-bar.component';
import { Store } from '@ngrx/store';
import { ExercisePageAction, selectQuizViewModel } from '@practice/store';
import { ExerciseService } from '@exercises/exercise.service';


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, LetDirective, MatCardModule, MatButtonModule,],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  vm$;
  // Answer config
  selectedOptionValue: string;
  correctResponse: string;

  fourAnswers: string[];
  correctAnswers: string[];


  constructor(
    private store: Store,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.vm$ = this.store.select(selectQuizViewModel);
    this.store.dispatch(ExercisePageAction.loadAnswerChoices());
    this.vm$.subscribe(console.log)
  }

  getNgClass(optionAnswer: string, correctAnswers: Array<string>, selectedAnswer: string, isAnswerLocked: boolean) {
    const isSelected = optionAnswer === selectedAnswer;
    if (!isAnswerLocked) return {
      selected: isSelected
    };

    const isCorrect = correctAnswers.includes(optionAnswer);

    return {
      correct: isCorrect,
      wrong: !isCorrect && isSelected
    }
  }

  selectAnswer(answer, isAnswerLocked) {
    if (isAnswerLocked) return;
    this.store.dispatch(ExercisePageAction.updateAnswerInput({ answerInput: answer }))
  }

  onSubmit(isAnswerLocked, selectedAnswer): void {
    if (!isAnswerLocked && !selectedAnswer.length) return;
    this.exerciseService.onSubmitAction();
  }

}
