import { CommonModule } from '@angular/common';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Word } from '@app/pages/classroom/store/words-list';
import { FormFieldComponent } from '@app/shared/controls/form-field/form-field.component';
import { InputComponent } from '@app/shared/controls/input/input.component';
import { AdditionalTranslationsComponent } from './additional-translations/additional-translations.component';
import { FormFooterComponent } from './form-footer/form-footer.component';
import { WordFormService } from './services/word-form.service';
import { WordFormState } from './word-form.state';
import { take } from 'rxjs';

@Component({
  selector: 'app-word-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, InputComponent, AdditionalTranslationsComponent, FormFooterComponent,],
  providers: [WordFormService, WordFormState],
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
})
export class WordFormComponent implements OnInit {
  @Input() word: Word;
  coreForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.coreForm = new FormGroup({
      word: new FormControl(null, [Validators.required]),
      translation: new FormControl(null, [Validators.required]),
      tips: new FormControl(null),
    });
    // CHECK WITH STORE IF EDITING A WORD. IF TRUE MAP WORD TO FORM AND PATCH

    // If tips exist create form control with value
  }


  onFormChanged() {
  }

  onSubmit() {
  }
}
