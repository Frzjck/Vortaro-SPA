import { CommonModule } from '@angular/common';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Word } from '@app/pages/classroom/store/words-list';
import { FormFieldComponent } from '@app/shared/controls/form-field/form-field.component';
import { InputComponent } from '@app/shared/controls/input/input.component';
import { AdditionalTranslationsComponent } from './additional-translations/additional-translations.component';
import { FormFooterComponent } from './form-footer/form-footer.component';
import { WordFormService } from './services/word-form.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-word-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, InputComponent, AdditionalTranslationsComponent, FormFooterComponent,],
  providers: [WordFormService],
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
})
export class WordFormComponent implements OnInit {
  @Input() word: Word;
  coreForm: FormGroup;
  isTips = false;
  storeFormObservable$ToBeCreated = { "additionalTranslations": [] };
  // @Output() onFinishSubmit = new EventEmitter();
  constructor(
  ) { }

  additionalTrArray: string[];

  ngOnInit(): void {
    if (this.word) {
      this.coreForm = new FormGroup({
        word: new FormControl(this.word.original, [Validators.required]),
        translation: new FormControl(this.word.translation, [
          Validators.required,
        ]),
        tips: new FormControl(this.word.tips),
      });
    } else {
      this.coreForm = new FormGroup({
        word: new FormControl(null, [Validators.required]),
        translation: new FormControl(null, [Validators.required]),
        tips: new FormControl(),
      });
    }
    interval(4000).subscribe(() => {
      console.log(this.coreForm)
    })
  }

  onSubmit() {
    // if (this.word) {
    //   this.wordService
    //     .editOrCreate(
    //       this.coreForm.value.word,
    //       this.coreForm.value.translation,
    //       this.coreForm.value.tips,
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
    //       this.coreForm.value.word,
    //       this.coreForm.value.translation,
    //       this.coreForm.value.tips,
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
}
