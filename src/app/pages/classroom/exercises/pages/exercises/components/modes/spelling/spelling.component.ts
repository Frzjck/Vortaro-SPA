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
import { ExercisePageAction, selectCurrentWord, selectAnswerInput, selectIsLastAnswerCorrect, selectProgress, selectSubmitButtonAction, selectTestingAgainst, SubmitButtonActionType, TestingAgainstType } from '@app/pages/classroom/exercises/store/exercises';
import { LetDirective } from '@ngrx/component';
import { ExerciseService } from '../../../exercises.service';
import { AutoFocus } from '../../../shared/directives/auto-focus.directive';
import { MatButtonModule } from '@angular/material/button';
import { selectSpellingViewModel } from '@app/pages/classroom/exercises/store/exercises/exercises.selectors';

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

  vm$;

  constructor(
    private store: Store, private exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {
    this.vm$ = this.store.select(selectSpellingViewModel);
  }

  onSubmit(): void {
    this.exerciseService.onSubmitAction();
    setTimeout(() => this.wordInput?.nativeElement.focus());
  }

  answerInput(event: string): void {
    this.store.dispatch(ExercisePageAction.updateAnswerInput({ answerInput: event }))
  }

}
