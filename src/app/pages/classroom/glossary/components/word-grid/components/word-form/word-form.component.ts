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


  constructor(private fb: FormBuilder, private footer: WordFormService) {

  }

  ngOnInit(): void {
    this.coreForm = this.fb.group({
      word: new FormControl(null, [Validators.required]),
      translation: new FormControl(null, [Validators.required]),
    })

    this.footer.addTips$.subscribe(() => {
      this.coreForm.addControl("tips", new FormControl());
    })

    if (this.word) {
      this.coreForm.patchValue({ word: this.word.original, translation: this.word.translation, });
      if (this.word.tips) this.createTipsControl(this.word.tips)
    }
  }


  createTipsControl(value?: string) {
    this.coreForm.addControl("tips", new FormControl(value));
  }

  onFormChanged() {
  }

  onSubmit() {
  }
}
