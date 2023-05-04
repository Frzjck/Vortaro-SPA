import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { thereAreWords } from '../store/words-list/words.selectors';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { getParams } from '@app/store/router/router.selector';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './exercise-menu.component.html',
  styleUrls: ['./exercise-menu.component.scss'],
})
export class ExerciseMenuComponent implements OnInit, OnDestroy {
  // private wordSub: Subscription;
  words: boolean = false;

  exerciseModeSub: Subscription;
  exerciseMode: string;

  thereAreWords = this.store.select(thereAreWords);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    // this.store.select(getExerciseMode).subscribe((type) => {
    //   this.exerciseMode = type;
    // });


    // Subscribe to words
    // this.wordSub = this.wordService.wordsObsListener().subscribe((words) => {
    //   this.words = words.length < 1 ? false : true;
    // });

    // Subscribe to exercise type
    // this.exerciseModeSub = this.settings.exerciseModeSub.subscribe((type) => {
    //   this.exerciseMode = type;
    // });

    //todo: remove this
    this.store.select(getParams).subscribe(console.log)
  }

  ngOnDestroy(): void {
    // this.wordSub.unsubscribe();
    // this.exerciseModeSub.unsubscribe();
  }
}
