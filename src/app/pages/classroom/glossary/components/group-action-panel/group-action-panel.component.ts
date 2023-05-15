import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LetDirective } from '@ngrx/component';


export interface GroupActionPanelInputInterface {
  groupId: string;
  seeAll: boolean;
  collapseAll: boolean;
  done: boolean;
  delete: boolean;
}

@Component({
  selector: 'app-group-action-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, LetDirective],
  template: `
  <ng-container *ngrxLet="groupActionPanelInput as vm">
    <button
      mat-button
      color="warn"
      class="dlt-btn"
      (click)="_buttonPressed('unfoldTranslations')"
      *ngIf="vm.seeAll"
    >
      See All
    </button>
    <button
      mat-button
      color="warn"
      class="dlt-btn"
      (click)="_buttonPressed('foldTranslations')"
      *ngIf="vm.collapseAll"
    >
      Collapse All
    </button>
    <ng-template #editBtn>
      <button
        mat-button
        class="edit-btn"
        (click)="_buttonPressed('edit')"
      >
        EDIT
      </button>
    </ng-template> 
    <button
      mat-button
      class="edit-btn"
      (click)="_buttonPressed('done')"
      *ngIf="vm.done; else editBtn"
    >
      DONE
    </button>
    <button
      mat-button
      color="warn"
      class="dlt-btn"
      (click)="_buttonPressed('delete')"
      *ngIf="vm.delete"
    >
      DELETE
    </button>
  </ng-container>
  `,
  styles: [
  ]
})
export class GroupActionPanelComponent {


  constructor() { }

  @Input() groupActionPanelInput: GroupActionPanelInputInterface;

  @Output() buttonPressed = new EventEmitter();

  _buttonPressed(option) {
    this.buttonPressed.emit({
      option: option,
      id: this.groupActionPanelInput.groupId
    });
  }
}

// {{
//   editMode === true && groupEditId === group.id ? "Save" : "Edit"
// }}