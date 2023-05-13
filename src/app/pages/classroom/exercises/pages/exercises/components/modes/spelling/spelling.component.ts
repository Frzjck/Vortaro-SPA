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
import { ProgressBarComponent } from '@exercises/pages/exercises/shared/progress-bar/progress-bar.component';
import { ExercisePageAction } from '@exercises/store/exercises';
import { ExerciseService } from '@exercises/pages/exercises/exercises.service';
import { AutoFocus } from '@exercises/pages/exercises/shared/directives/auto-focus.directive';
import { selectSpellingViewModel } from '@exercises/store/exercises/exercises.selectors';

@Component({
  selector: 'app-spelling',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, MatCardModule, ReactiveFormsModule, FormsModule, MatInputModule, LetDirective, AutoFocus, MatButtonModule],
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.scss'],
})
export class SpellingComponent implements OnInit {
  vm$;
  @ViewChild('wordInput') private wordInput: ElementRef;

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
