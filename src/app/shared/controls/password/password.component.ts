import { CommonModule } from '@angular/common';
import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type PasswordType = 'password' | 'text';
@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="password">
    <input type="text" class="app-input" [value]="value" [placeholder]="placeholder || 'Password'"
        [attr.disabled]="isDisabled ? true : null" (keyup)="onKeyup($event.target.value)" (blur)="onBlur()"
        [attr.type]="passwordType">

    <div class="password__actions" (click)="togglePassword()">
        <span>{{passwordType === 'password' ? 'Show' : 'Hide'}}</span>
    </div>
  </div>
  `,
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent {

  @Input() placeholder: string;

  @Output() changed = new EventEmitter<string>();

  value: string;
  isDisabled: boolean;
  passwordType: PasswordType;

  constructor() {
    this.passwordType = 'password';
  }

  ngOnInit(): void {
  }

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };

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

  togglePassword(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

}
