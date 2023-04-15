import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { SettingsService } from '@app/services/settings.service';
import { WordService } from '@app/services/word.service';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit, OnDestroy {
  // private wordSub: Subscription;
  words: boolean = false;

  exerciseTypeSub: Subscription;
  exerciseType: string;

  constructor(
    private wordService: WordService,
    private settings: SettingsService
  ) { }

  ngOnInit(): void {
    // Subscribe to words
    // this.wordSub = this.wordService.wordsObsListener().subscribe((words) => {
    //   this.words = words.length < 1 ? false : true;
    // });

    // Subscribe to exercise type
    this.exerciseTypeSub = this.settings.exerciseModeSub.subscribe((type) => {
      this.exerciseType = type;
    });
  }
  ngOnDestroy(): void {
    // this.wordSub.unsubscribe();
    // this.exerciseTypeSub.unsubscribe();
  }
}
