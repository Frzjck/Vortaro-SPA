import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '@app/shared/controls/form-field/form-field.component';
import { InputComponent } from '@app/shared/controls/input/input.component';

import { Store } from '@ngrx/store';
import { markFormGroupTouched } from '@app/shared/utils/form';

@Component({
    selector: 'app-group-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, InputComponent],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './group-form.component.html',
    styles: [],
})
export class GroupFormComponent implements OnInit {
    @Input() groupId: string;
    coreForm: FormGroup;

    constructor(private store: Store, private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.coreForm = this.fb.group({
            original: new FormControl(null, [Validators.required]),
            translation: new FormControl(null, [Validators.required]),
        })
    }

}
