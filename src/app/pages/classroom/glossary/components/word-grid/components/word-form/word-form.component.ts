import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Word } from '@app/pages/classroom/store/words-list';
import { FormFieldComponent } from '@app/shared/controls/form-field/form-field.component';
import { InputComponent } from '@app/shared/controls/input/input.component';
import { AdditionalTranslationsComponent } from './additional-translations/additional-translations.component';
import { FormFooterComponent } from './form-footer/form-footer.component';
import { WordFormService } from './services/word-form.service';
import { WordFormState } from './word-form.state';

@Component({
  selector: 'app-word-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, InputComponent, AdditionalTranslationsComponent, FormFooterComponent,],
  providers: [WordFormService, WordFormState],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
})
export class WordFormComponent implements OnInit {
  @Input() word: Word;
  coreForm: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.coreForm = this.fb.group({
      word: new FormControl(null, [Validators.required]),
      translation: new FormControl(null, [Validators.required]),
    });

    if (this.word?.tips) this.createTipsControl()
    // CHECK WITH STORE IF EDITING A WORD. IF TRUE MAP WORD TO FORM AND PATCH
    if (this.word) this.coreForm.patchValue({
      word: this.word.original,
      translation: this.word.translation,
    })

    // If tips exist create form control with value
  }


  createTipsControl() {
    this.coreForm.addControl("tips", new FormControl(this.word.tips));
  }

  onFormChanged() {
  }

  onSubmit() {
  }
}
