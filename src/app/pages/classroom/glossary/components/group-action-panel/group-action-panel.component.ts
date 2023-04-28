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
    >
      See All
    </button>
    <button
      mat-button
      color="warn"
      class="dlt-btn"
      (click)="store.foldTranslationsGroup()"
    >
      Collapse All
    </button>
    <button
      mat-button
      class="edit-btn"
    >

    </button>
    <button
      mat-button
      color="warn"
      class="dlt-btn"
      (click)="store.deleteGroup(vm.groupId)"
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

}

// {{
//   editMode === true && groupEditId === group.id ? "Save" : "Edit"
// }}