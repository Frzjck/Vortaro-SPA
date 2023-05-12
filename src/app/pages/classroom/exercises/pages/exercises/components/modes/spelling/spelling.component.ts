import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { Word } from '@app/pages/classroom/store/words-list';
import { Observable } from 'rxjs';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { Store } from '@ngrx/store';
import { getCurrentWord, selectIsLastAnswerCorrect, selectProgress, selectSubmitButtonAction, selectTestingAgainst, SubmitButtonActionType, TestingAgainstType } from '@app/pages/classroom/exercises/store/exercises';
import { LetDirective } from '@ngrx/component';
import { ExerciseService } from '../../../exercises.service';
import { AutoFocus } from '../../../shared/directives/auto-focus.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-spelling',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, MatCardModule, ReactiveFormsModule, FormsModule, MatInputModule, LetDirective, AutoFocus, MatButtonModule],
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.scss'],
})
export class SpellingComponent implements OnInit {
  // Get elem ref so we can focus it
  @ViewChild('wordInput') private wordInput: ElementRef;

  inputValue: string = '';

  // Refactored
  currentWord$: Observable<Word>;
  submitButtonAction$: Observable<SubmitButtonActionType>;
  testingAgainst$: Observable<TestingAgainstType>;
  isLastAnswerCorrect$: Observable<boolean>;
  progress$: Observable<number>;

  constructor(
    private store: Store, private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.currentWord$ = this.store.select(getCurrentWord)
    this.submitButtonAction$ = this.store.select(selectSubmitButtonAction);
    this.testingAgainst$ = this.store.select(selectTestingAgainst);
    this.isLastAnswerCorrect$ = this.store.select(selectIsLastAnswerCorrect);
    this.progress$ = this.store.select(selectProgress);
  }

  onSubmit(word): void {
    this.exerciseService.onSubmitAction(word, this.inputValue);
    setTimeout(() => this.wordInput?.nativeElement.focus());
    this.clearInputValue();
  }

  clearInputValue(): void {
    this.inputValue = ""
  }
}
