import { Component, ElementRef, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
  <input type="text" class="app-input" 
    [placeholder]="placeholder || ''"
    [attr.disabled]="isDisabled ? true : null"
    (keyup)="onKeyup($event.target.value)" 
    (blur)="onBlur()">
    #inputRef
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

export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Output() changed = new EventEmitter<string>();

  inputRef: ElementRef<HTMLInputElement>;

  isDisabled: boolean;

  constructor() {

  }
  ngOnInit(): void {

  }

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };

  // https://stackoverflow.com/questions/76389471/angular-retaining-input-value-after-form-reset
  writeValue(value: string): void {
    if (this.inputRef) this.inputRef.nativeElement.value = value;
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
    this.inputRef.nativeElement.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
