import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { GroupService } from '@app/services/group.service';
import { ProgressBarService } from '@app/services/progress-bar.service';
import { ResultsService } from '@app/services/results.service';
import { SettingsService } from '@app/services/settings.service';
import { WordService } from '@app/services/word.service';
import { Word } from '@app/pages/classroom/store/words-list';
import { Subscription } from 'rxjs';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';

@Component({
  selector: 'app-type-test',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent, MatCardModule],
  templateUrl: './type-test.component.html',
  styleUrls: ['./type-test.component.scss'],
})
export class TypeTestComponent implements OnInit, OnDestroy {
  words: Word[];
  activeWordIndex = 0;
  activeWord: Word;

  pendingFstSub = true;

  // Array of boolean to display results after finishing
  scoreArr: boolean[] = [];
  correct: boolean;
  wordWorthPercent: number;

  // Settings config
  translateDirection: boolean;

  // Anwser config
  selectedOptionValue: string;
  selectedOption: number;
  confirmedResponse: string;
  correctResponse: string;

  fourAnswers: string[];
  correctAnswers: string[];
  randomCorrect: string;

  groupIdParam;
  exTypeParam;
  private wordSub: Subscription;

  constructor(
    private wordService: WordService,
    private resultsService: ResultsService,
    private groupService: GroupService,
    private progressService: ProgressBarService,
    private settings: SettingsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Settings config fetching
    this.translateDirection = this.settings.translateDirection;
    this.route.params.subscribe((params: Params) => {
      this.groupIdParam = params['id'];
      this.exTypeParam = params['type'];
    });
    // Subscribe to words
    // this.wordSub = this.wordService.wordsObsListener().subscribe(() => {
    //   // Loading words
    //   this.words = this.wordService.getRightWords(
    //     this.exTypeParam,
    //     this.groupIdParam
    //   );
    //   this.activeWord = this.words[this.activeWordIndex];
    //   // Calculating percetage per word for progress bar
    //   this.wordWorthPercent = 100 / this.words.length;
    //   // Save array for results
    //   this.resultsService.saveWordArr(this.words);
    //   // Posible responses
    //   this.updateQuizzOptions();
    // });
  }
  ngOnDestroy() {
    // this.wordSub.unsubscribe();
  }

  onOptionSelect(option, order) {
    this.selectedOptionValue = option;
    this.selectedOption = order;
  }

  // Handle correction and next word
  onSubmit() {
    if (this.pendingFstSub) {
      if (!this.selectedOption) return;
      this.confirmedResponse = this.selectedOptionValue;
      // Changing direction
      if (!this.translateDirection) {
        this.correctResponse = this.activeWord.name.toLowerCase();
      }
      // Moving progress bar
      this.progressService.progressEmitter.next(this.wordWorthPercent);
      if (this.correctResponse.includes(this.confirmedResponse.toLowerCase())) {
        // TODO MODIFY WORD SCORE
        this.correct = true;
      } else {
        // TODO MODIFY WORD SCORE
        this.correct = false;
      }
      // Saving score to be displayed in results page
      this.scoreArr.push(this.correct);

      this.pendingFstSub = false;
    } else {
      // Break functionality when reached end of array
      if (this.activeWordIndex === this.words.length - 1) {
        // TODO Redirect to RESULTS PAGE and send results
        // this.resultsService
        //   .saveResultsInfo(this.scoreArr, 'quiz')
        //   .subscribe(() => {
        //     this.wordService.getWordsFromServer();
        //     this.groupService.loadGroups();
        //   });
        this.router.navigate(['results'], { relativeTo: this.route });
        return;
      }
      this.cleanVars();
      this.activeWordIndex++;
      // Fetching new word from random-array
      this.activeWord = this.words[this.activeWordIndex];
      this.updateQuizzOptions();
      // Cleaning form after new word is displayed
      this.pendingFstSub = true;
    }
  }

  updateQuizzOptions() {
    if (this.translateDirection) {
      this.fourAnswers = this.words
        .filter((word) => word !== this.activeWord)
        .reduce((acc, cur) => {
          acc.push(cur.translation);
          acc.push(...cur.additionalTr);
          return acc;
        }, []);
      this.fourAnswers = this.wordService.shuffle(this.fourAnswers).slice(0, 3);
      this.correctAnswers = [
        ...this.activeWord.additionalTr.map((x) => x.toLowerCase()),
        this.activeWord.translation.toLowerCase(),
      ];

      [this.correctResponse] = this.wordService
        .shuffle(this.correctAnswers)
        .slice(0, 1);

      this.fourAnswers.push(this.correctResponse);
      this.fourAnswers = this.wordService.shuffle(this.fourAnswers);
    }
    if (!this.translateDirection) {
      this.fourAnswers = this.words
        .filter((word) => word !== this.activeWord)
        .map((word) => word.name);
      this.fourAnswers = this.wordService.shuffle(this.fourAnswers).slice(0, 3);
      this.fourAnswers.push(this.activeWord.name);
      this.fourAnswers = this.wordService.shuffle(this.fourAnswers);
    }
  }

  cleanVars() {
    this.selectedOptionValue = undefined;
    this.selectedOption = undefined;
    this.confirmedResponse = undefined;
    this.correctResponse = undefined;
    this.fourAnswers = undefined;
  }
}
