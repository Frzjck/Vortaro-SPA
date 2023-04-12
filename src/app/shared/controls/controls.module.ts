import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormFieldComponent } from './form-field/form-field.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputComponent,
    FormFieldComponent,
  ],
  exports: [InputComponent, FormFieldComponent]
})
export class ControlsModule { }
