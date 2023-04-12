import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsModule, PasswordComponent, SpinnerComponent, regex, regexErrors } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlsModule, PasswordComponent, SpinnerComponent],
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent {
  form: FormGroup;
  isInline: boolean;
  regexErrors = regexErrors;

  showSpinner = false;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.fb.group({
      input: [null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.minLength(3), Validators.pattern(regex.email)]
      }],
      password: [null, {
        updateOn: 'blur', validators: [
          Validators.required
        ]
      }]
    });
  }

  onToggleSpinner(): void {
    this.showSpinner = !this.showSpinner;
  }

  onSuccess(): void {
    // this.notification.success('Everything is fine!');
  }

  onError(): void {
    // this.notification.error('Oops! Something is wrong');
  }

  onPatchValue(): void {
    this.form.patchValue({
      input: "test",
      // password: 'qwerty',
      // autocomplete: 1,
      // select: 2,
      // checkboxes: [3],
      // radios: 4,
      // date: new Date().getTime(),
      // dateRange: {
      //     from: new Date(2019, 5, 10).getTime(),
      //     to: new Date(2019, 5, 25).getTime()
      // }
    });
  }
  onToggleInline(): void {
    this.isInline = !this.isInline;
  }
  onSubmit(): void {
    console.log("Submit!")
  }
}
