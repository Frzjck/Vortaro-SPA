import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Word } from '@app/pages/classroom/store/words-list';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
})
export class WordFormComponent implements OnInit {
  @Input() word: Word;
  @Input() group: Word;//tododelete
  wordForm: FormGroup;
  // @Output() onFinishSubmit = new EventEmitter();
  constructor(
  ) { }

  additionalTrArray: string[];

  ngOnInit(): void {
    if (this.word) {
      this.wordForm = new FormGroup({
        word: new FormControl(this.word.original, [Validators.required]),
        translation: new FormControl(this.word.translation, [
          Validators.required,
        ]),
        tips: new FormControl(this.word.tips),
        additionalTr: new FormControl(this.additionalTrToString()),
      });
    } else {
      this.wordForm = new FormGroup({
        word: new FormControl(null, [Validators.required]),
        translation: new FormControl(null, [Validators.required]),
        tips: new FormControl(),
        additionalTr: new FormControl(),
      });
    }
  }

  onSubmit() {
    // if (this.word) {
    //   this.wordService
    //     .editOrCreate(
    //       this.wordForm.value.word,
    //       this.wordForm.value.translation,
    //       this.wordForm.value.tips,
    //       undefined,
    //       this.word.id,
    //       this.formatAdditionalTr()
    //     )
    //     .subscribe(() => {
    //       this.groupService.loadGroups();
    //       this.wordService.getWordsFromServer();
    //     });
    // } else {
    //   this.wordService
    //     .editOrCreate(
    //       this.wordForm.value.word,
    //       this.wordForm.value.translation,
    //       this.wordForm.value.tips,
    //       this.group.id,
    //       undefined,
    //       this.formatAdditionalTr()
    //     )
    //     .subscribe(() => {
    //       this.wordService.getWordsFromServer();
    //       this.groupService.loadGroups();
    //     });
    // }
    // this.additionalTrArray = undefined;
    // this.onFinishSubmit.emit();
  }

  onClose() {
    // this.onFinishSubmit.emit();
  }

  formatAdditionalTr() {
    if (this.wordForm.value.additionalTr) {
      this.additionalTrArray = [];
      this.additionalTrArray = this.wordForm.value.additionalTr
        .split(',')
        .map((tr) => {
          return tr.trim();
        });
      return this.additionalTrArray;
    } else {
      return [];
    }
  }
  additionalTrToString() {
    let string = this.word.additionalTr.join(', ');
    return string;
  }
}
