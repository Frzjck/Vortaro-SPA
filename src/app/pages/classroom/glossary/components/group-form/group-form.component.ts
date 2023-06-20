import { CommonModule } from '@angular/common';

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Group } from '@app/pages/classroom/store/groups-list/groups.models';
import { FormFieldComponent } from '@app/shared/controls/form-field/form-field.component';
import { InputComponent } from '@app/shared/controls/input/input.component';
import { markFormGroupTouched } from '@app/shared/utils/form';

import { Store } from '@ngrx/store';
import { GroupFormAction } from './group-form.actions';
import { StopPropagationDirective } from '@app/shared/directives/stop-propagation.directive';

@Component({
    selector: 'app-group-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormFieldComponent, InputComponent, StopPropagationDirective],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './group-form.component.html',
    styles: [],
})
export class GroupFormComponent implements OnInit {
    @Input() group: Group;
    coreForm: FormGroup;

    constructor(private store: Store, private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.coreForm = this.fb.group({
            name: new FormControl(null, [Validators.required]),
        })
    }
    onSubmit() {
        if (!this.coreForm.valid) {
            markFormGroupTouched(this.coreForm);
            this.coreForm.updateValueAndValidity();
            this.cdr.detectChanges();
        } else {
            if (this.group) this.store.dispatch(GroupFormAction.updateGroup({ formGroup: this.coreForm.value, groupId: this.group.id }));
            else this.store.dispatch(GroupFormAction.createGroup({ formGroup: this.coreForm.value }));
        }
    }

    onCancel() {
        if (this.group) this.store.dispatch(GroupFormAction.cancelRenameGroup());
        else this.store.dispatch(GroupFormAction.cancelNewGroupMode());
    }
}
