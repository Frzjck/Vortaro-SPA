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
import { getCurrentWord, getRandomWords, getWorstWords, selectIsLastAnswerCorrect, selectSubmitButtonAction, selectTestingAgainst, SubmitButtonActionType, TestingAgainstType } from '@app/pages/classroom/exercises/store/exercises';
import { LetDirective } from '@ngrx/component';
import { ExerciseService } from '../../../exercises.service';

@Component({
  selector: 'app-spelling',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, MatCardModule, ReactiveFormsModule, FormsModule, MatInputModule, LetDirective],
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.scss'],
})
export class SpellingComponent implements OnInit, AfterViewInit {
  // Get elem ref so we can focus it
  @ViewChild('wordInput') private wordInput: ElementRef;
  @ViewChild('grayCardinal') private grayCardinal: ElementRef;

  inputValue: string = '';
  // To prevent seizures run only on desktop
  windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

  // Array of boolean to display results after finishing
  correct: boolean;
  wordWorthPercent: number = 20;

  // Refactored
  currentWord$: Observable<Word>;
  submitButtonAction$: Observable<SubmitButtonActionType>;
  testingAgainst$: Observable<TestingAgainstType>;
  isLastAnswerCorrect$: Observable<boolean>;
  constructor(
    private store: Store, private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    // this.typeOfOS = window.navigator.platform;
    console.log("SPELLING COMPONENT INIT")
    this.currentWord$ = this.store.select(getCurrentWord)
    this.submitButtonAction$ = this.store.select(selectSubmitButtonAction);
    this.testingAgainst$ = this.store.select(selectTestingAgainst);
    this.isLastAnswerCorrect$ = this.store.select(selectIsLastAnswerCorrect);
  }

  ngAfterViewInit(): void {
    // if (this.windowsPlatforms.includes(this.typeOfOS)) {
    //   // Making sure input is focused
    //   window.setTimeout(() => {
    //     this.wordInput.nativeElement.focus();
    //   });
    // }
  }

  onSubmit(word): void {
    this.exerciseService.onSubmitAction(word, this.inputValue);
    // this.clearInputValue();
  }

  clearInputValue(): void {
    this.inputValue = ""
  }
}
