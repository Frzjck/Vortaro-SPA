import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { ProgressBarComponent } from '@exercises/shared/progress-bar/progress-bar.component';
import { ExerciseService } from '@exercises/services/exercise.service';
import { AutoFocus } from '@exercises/shared/directives/auto-focus.directive';
import { Observable } from 'rxjs';
import { Word } from '@classroom/store/words-list/words.models';
import { TestingAgainstType } from '@app/store/app/app.reducer';
import { selectSpellingViewModel } from '@practice/store/practice/practice.selectors';
import { ExercisePageAction } from '@practice/store/practice/practice.actions';

interface spellingVMInterface {
  currentWord: Word;
  testingAgainst: TestingAgainstType;
  isLastAnswerCorrect: boolean;
  progress: number;
  answerInput: string;
  isAnswerLocked: boolean;
}

@Component({
  selector: 'app-spelling',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, MatCardModule, ReactiveFormsModule, FormsModule, MatInputModule, LetDirective, AutoFocus, MatButtonModule],
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.scss'],
})
export class SpellingComponent implements OnInit {
  vm$: Observable<spellingVMInterface>;

  @ViewChild('wordInput') private wordInput: ElementRef;

  constructor(
    private store: Store, private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.vm$ = this.store.select(selectSpellingViewModel);
  }

  onSubmit(isAnswerLocked, selectedAnswer): void {
    if (!isAnswerLocked && !selectedAnswer.length) return;
    this.exerciseService.onSubmitAction();
    setTimeout(() => this.wordInput?.nativeElement.focus());
  }

  answerInput(event: string): void {
    this.store.dispatch(ExercisePageAction.updateAnswerInput({ answerInput: event }))
  }

}
