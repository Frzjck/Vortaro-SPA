import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProgressBarService } from '@app/services/progress-bar.service';
import { SettingsService } from '@app/services/settings.service';
import { Word, getWordsByGroupId } from '@app/pages/classroom/store/words-list';
import { Observable, Subscription } from 'rxjs';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { Store } from '@ngrx/store';
import { getParams } from '@app/store/router/router.selector';
import { switchCase } from '../../../utils/switchCase';
import { getCurrentGroupExerciseWords, getRandomWords, getWorstWords, selectTranslateDirection } from '@app/pages/classroom/exercises/store/exercises';

@Component({
  selector: 'app-spelling',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, MatCardModule, ReactiveFormsModule, FormsModule, MatInputModule],
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
  words$: Observable<Word[]>;
  translateDirection$: Observable<boolean>;


  constructor(
    private progressService: ProgressBarService,
    private settings: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    // this.typeOfOS = window.navigator.platform;

    this.words$ = this.store.select(getParams).pipe(
      switchCase(
        [(params) => params.exerciseType === "group", () => this.store.select(getCurrentGroupExerciseWords)],
        [(params) => params.exerciseType === "mistakes", () => this.store.select(getWorstWords)],
        [(params) => params.exerciseType === "random", () => this.store.select(getRandomWords)],
      )
    );
    this.translateDirection$ = this.store.select(selectTranslateDirection);
  }

  ngAfterViewInit(): void {
    // if (this.windowsPlatforms.includes(this.typeOfOS)) {
    //   // Making sure input is focused
    //   window.setTimeout(() => {
    //     this.wordInput.nativeElement.focus();
    //   });
    // }
  }

  // Handle correction and next word
  onSend() {
    //   if (this.pendingFstSub) {
    //     // Changing direction
    //     let controlWord = [this.activeWord.name.toLowerCase()];
    //     // here we sum up all the translations in sigle array
    //     let controlTr = [
    //       ...this.activeWord.additionalTr.map((x) => x.toLowerCase()),
    //       this.activeWord.translation.toLowerCase(),
    //     ];
    //     let controlArr = this.translateDirection ? controlTr : controlWord;
    //     // Moving progress bar
    //     this.progressService.progressEmitter.next(this.wordWorthPercent);
    //     if (controlArr.includes(this.inputValue.toLowerCase())) {
    //       // TODO MODIFY WORD SCORE
    //       this.correct = true;
    //       this.inputValue = 'Correcto';
    //     } else {
    //       // TODO MODIFY WORD SCORE
    //       this.correct = false;
    //       this.inputValue = 'Incorrecto';
    //     }
    //     // Saving score to be displayed in results page
    //     this.scoreArr.push(this.correct);

    //     if (this.windowsPlatforms.includes(this.typeOfOS)) {
    //       // Disabling main input prevent sending events through
    //       setTimeout(() => this.grayCardinal.nativeElement.focus());
    //     }
    //     this.pendingFstSub = false;
    //   } else {
    //     // Break functionality when reached end of array
    //     if (this.activeWordIndex === this.words.length - 1) {
    //       // // TODO Redirect to RESULTS PAGE and send results
    //       // this.resultsService
    //       //   .saveResultsInfo(this.scoreArr, 'spelling')
    //       //   .subscribe(() => {
    //       //     this.wordService.getWordsFromServer();
    //       //     this.groupService.loadGroups();
    //       //   });
    //       this.router.navigate(['results'], { relativeTo: this.route });
    //       return;
    //     }
    //     this.activeWordIndex++;
    //     // Fetching new word from random-array
    //     this.activeWord = this.words[this.activeWordIndex];
    //     // Cleaning form after new word is displayed
    //     this.inputValue = '';

    //     if (this.windowsPlatforms.includes(this.typeOfOS)) {
    //       // Returning focus after new word is displayed
    //       // Set timeout is to prevent conflict with disabeling input
    //       setTimeout(() => this.wordInput.nativeElement.focus());
    //     }

    //     this.pendingFstSub = true;
    //   }
  }
}
