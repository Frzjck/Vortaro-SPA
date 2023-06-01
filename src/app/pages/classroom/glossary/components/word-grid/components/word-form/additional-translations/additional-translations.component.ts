import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '@app/shared/controls/form-field/form-field.component';
import { InputComponent } from '@app/shared/controls/input/input.component';
import { Subject, takeUntil } from 'rxjs';
import { WordFormService } from '../services/word-form.service';

@Component({
  selector: 'app-additional-translations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, InputComponent],
  templateUrl: './additional-translations.component.html',
  styleUrls: ['./additional-translations.component.scss']
})
export class AdditionalTranslationsComponent {
  @Input() public name: string;
  @Input() public parent: FormGroup;

  @Input() public values;

  form: FormArray;

  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private footer: WordFormService
  ) { }


  ngOnInit(): void {
    this.values = this.values ? this.values : [];
    this.init();
    this.footer.addTranslation$.pipe(takeUntil(this.destroy)).subscribe(() => this.addTranslation())
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);

    this.destroy.next();
    this.destroy.complete();
  }

  private init(): void {
    this.form = this.fb.array(
      this.getFormGroupArray(this.values)
    );

    this.parent.addControl(this.name, this.form);
  }

  private getFormGroupArray(values): FormGroup[] {
    if (!this.values.length) {
      return [this.getFormGroup()];
    } else {
      return values.map(value => this.getFormGroup(value));
    }
  }

  private getFormGroup(value?): FormGroup {
    const group = this.fb.group({
      translation: [null, {
        updateOn: 'change'
      }]
    });

    if (value) {
      group.patchValue(value);
    }

    return group;
  }

  addTranslation(): void {
    this.form.push(this.getFormGroup());
  }

  deleteTranslation(i: number): void {
    this.form.removeAt(i);
  }
}
