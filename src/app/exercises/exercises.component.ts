import { Component, OnDestroy, OnInit } from '@angular/core';
import { WordManageService } from '../services/word-manage.service';
import { SettingsService } from '../services/settings.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent implements OnInit, OnDestroy {
  private wordSub: Subscription;
  words: boolean = false;

  exerciseTypeSub: Subscription;
  exerciseType: string;

  constructor(
    private wordService: WordManageService,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    // Subscribe to words
    this.wordSub = this.wordService.wordsObsListener().subscribe((words) => {
      this.words = words.length < 1 ? false : true;
    });

    // Subscribe to exercise type
    this.exerciseTypeSub = this.settings.exerciseModeSub.subscribe((type) => {
      this.exerciseType = type;
    });
  }
  ngOnDestroy(): void {
    this.wordSub.unsubscribe();
    this.exerciseTypeSub.unsubscribe();
  }
}
