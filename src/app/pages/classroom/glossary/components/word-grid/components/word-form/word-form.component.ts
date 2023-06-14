import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '@app/shared/controls/form-field/form-field.component';
import { InputComponent } from '@app/shared/controls/input/input.component';
import { AdditionalTranslationsComponent } from './additional-translations/additional-translations.component';
import { FormFooterComponent } from './form-footer/form-footer.component';
import { WordFormService } from './services/word-form.service';
import { Store } from '@ngrx/store';
import { markFormGroupTouched } from '@app/shared/utils/form';
import { Word } from '@classroom/store/words-list/words.models';
import { UnknownPageWordAction } from '@classroom/store/words-list/words.actions';
import { WordFormAction } from '@app/pages/classroom/glossary/store/glossary/glossary.actions';

@Component({
  selector: 'app-word-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, InputComponent, AdditionalTranslationsComponent, FormFooterComponent,],
  providers: [WordFormService],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss'],
})
export class WordFormComponent implements OnInit {
  @Input() word: Word;
  @Input() groupId: string;
  coreForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private footer: WordFormService, private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.footer.addTips$.subscribe(() => this.createTipsControl());

    this.footer.submitWordForm$.subscribe(() => this.onSubmit());
    this.footer.closeForm$.subscribe(() => {
      if (this.word) this.store.dispatch(WordFormAction.cancelEditWord())
      else this.store.dispatch(WordFormAction.cancelNewWordMode())
    });

    this.coreForm = this.fb.group({
      original: new FormControl(null, [Validators.required]),
      translation: new FormControl(null, [Validators.required]),
    })

    if (this.word) {
      this.coreForm.patchValue({ word: this.word.original, translation: this.word.translation });
      if (this.word.tips) this.createTipsControl(this.word.tips)
    }
  }


  createTipsControl(value?: string) {
    this.coreForm.addControl("tips", new FormControl(value));
  }

  onSubmit() {
    if (!this.coreForm.valid) {
      markFormGroupTouched(this.coreForm);
      this.coreForm.updateValueAndValidity();
      this.cdr.detectChanges();
    } else {
      this.store.dispatch(UnknownPageWordAction.createFormWord({ word: this.coreForm.value, groupId: this.groupId }));
    }
  }
}
