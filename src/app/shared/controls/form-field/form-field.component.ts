import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="form-field" [class.form-field_error]="hasError()" [class.form-field_inline]="isInline">
    <label class="form-field__label">
        {{ label }}
        <span class="form-field__req" *ngIf="required">*</span>
    </label>

    <div class="form-field__control">
        <ng-content></ng-content>

        <div class="form-field__error">

            <ng-container *ngIf="control && errorKey" [ngSwitch]="errorKey">
                <span *ngSwitchCase="'min'">Minimum {{control.errors[errorKey].min}}</span>
                <span *ngSwitchCase="'max'">Maximum {{control.errors[errorKey].max}}</span>
                <span *ngSwitchCase="'required'">This field is required</span>
                <span *ngSwitchCase="'requiredTrue'">This field is required</span>
                <span *ngSwitchCase="'minlength'">At least {{control.errors[errorKey].requiredLength}} characters</span>
                <span *ngSwitchCase="'maxlength'">No more than {{control.errors[errorKey].requiredLength}}
                    characters</span>
                <span *ngSwitchCase="'pattern'">
                    <span *ngIf="patternError">{{patternError}}</span>
                    <span *ngIf="!patternError">Pattern does not match</span>
                </span>
            </ng-container>

        </div>
    </div>

</div>
  `,
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input() label: string;
  @Input() required: boolean;
  @Input() isInline: boolean;
  @Input() control: AbstractControl;
  @Input() patternError: string;

  constructor() {
    this.isInline = true;
  }

  ngOnInit(): void {
  }

  hasError(): boolean {
    return this.control && this.control.invalid && this.control.touched;
  }

  get errorKey() {
    return this.control && this.control.errors && Object.keys(this.control.errors)[0];
  }
}
