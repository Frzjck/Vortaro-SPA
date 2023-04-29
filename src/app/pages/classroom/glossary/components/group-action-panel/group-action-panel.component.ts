import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { GlossaryStateFacade } from '../../glossary.state.facade';
import { LetModule } from '@ngrx/component';


export interface GroupActionPanelInputInterface {
  groupId: string;
  // groupEditId: string;
  // exerciseMode: boolean;
}
@Component({
  selector: 'app-group-action-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, LetModule],
  template: `
  <ng-container *ngrxLet="groupActionPanelInput as vm">
    <button
      mat-button
      color="warn"
      class="dlt-btn"
      (click)="store.unfoldTranslationsGroup(vm.groupId)"
      *ngIf="!(store.isAllGroupTranslationsUnfolded$(vm.groupId) | async)"
    >
      See All
    </button>
    <button
      mat-button
      color="warn"
      class="dlt-btn"
      (click)="store.foldTranslationsGroup()"
      *ngIf="store.groupHasUnfoldedTranslations$(vm.groupId) | async"
    >
      Collapse All
    </button>
    <button
      mat-button
      class="edit-btn"
      *ngIf="true; else saveBtn"
    >
      EDIT
    </button>
    <ng-template #saveBtn>
      <button
        mat-button
        class="edit-btn"
      >
        SAVE
      </button>
    </ng-template> 
    <button
      mat-button
      color="warn"
      class="dlt-btn"
      (click)="onDelete()"
    >
      DELETE
    </button>
  </ng-container>
  `,
  styles: [
  ]
})
export class GroupActionPanelComponent {


  constructor(public store: GlossaryStateFacade) { }

  @Input() groupActionPanelInput: GroupActionPanelInputInterface;

  onDelete() {
    if (confirm('Are you sure you want to delete ')) {
      this.store.deleteGroup(this.groupActionPanelInput.groupId);
    }
  }
}

// {{
//   editMode === true && groupEditId === group.id ? "Save" : "Edit"
// }}