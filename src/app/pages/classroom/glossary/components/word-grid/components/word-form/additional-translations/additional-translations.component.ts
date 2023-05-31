import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@app/shared/controls/form-field/form-field.component';
import { InputComponent } from '@app/shared/controls/input/input.component';

@Component({
  selector: 'app-additional-translations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, InputComponent],
  templateUrl: './additional-translations.component.html',
  styleUrls: ['./additional-translations.component.scss']
})
export class AdditionalTranslationsComponent {

}
