import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';
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
  storeFormObservable$ToBeCreated = { "additionalTranslations": [] };

  constructor(
  ) { }

  ngOnInit(): void {

    this.coreForm = new FormGroup({
      word: new FormControl(null, [Validators.required]),
      translation: new FormControl(null, [Validators.required]),
    });
    // If tips exist create form control with value

    // CHECK WITH STORE IF EDITING A WORD. IF TRUE MAP WORD TO FORM AND PATCH
    interval(4000).subscribe(() => {
      console.log(this.coreForm)
    })

  }
  createTipsControl() {
    this.coreForm.addControl("tips", new FormControl(null));
  }
  onSubmit() {
  }
}
