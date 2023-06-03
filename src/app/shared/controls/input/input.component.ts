import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <input type="text" class="app-input" 
    [placeholder]="placeholder || ''"
    [attr.disabled]="isDisabled ? true : null"
    (keyup)="onKeyup($event.target.value)" 
    (blur)="onBlur()"
    [(ngModel)]="value"
    >
  `,
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
})

export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Output() changed = new EventEmitter<string>();

  isDisabled: boolean;
  value: string;

  constructor() {

  }

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };

  // https://stackoverflow.com/questions/76389471/angular-retaining-input-value-after-form-reset
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyup(value: string): void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
