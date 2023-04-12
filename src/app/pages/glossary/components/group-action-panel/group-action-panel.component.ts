import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-action-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
   <button
    *ngIf="conditionalForSeeAll(group.id) && editMode === false"
    mat-button
    color="warn"
    class="dlt-btn"
    (click)="openAllTranslations(group.id)"
  >
    See All
  </button>
  <button
    *ngIf="
      !conditionalForSeeAll() &&
      editMode === false &&
      areThereAddTr(group.id)
    "
    mat-button
    color="warn"
    class="dlt-btn"
    (click)="closeAllTranslations()"
  >
    Collapse All
  </button>
  <button
    *ngIf="!exerciseMode"
    mat-button
    class="edit-btn"
    (click)="onEditMode(group.id)"
  >
    {{
      editMode === true && groupEditId === group.id ? "Save" : "Edit"
    }}
  </button>
  <button
    *ngIf="!exerciseMode"
    mat-button
    color="warn"
    class="dlt-btn"
    (click)="onDeleteGroup(group.name, group.id)"
  >
    DELETE
  </button>
  <button
    *ngIf="exerciseMode && exerciseType === 'spelling'"
    mat-button
    class="practice-btn"
    [routerLink]="['/exercises/spelling', 'word-group', group.id]"
    routerLinkActive="mat-accent"
  >
    Practice
  </button>
  <button
    *ngIf="exerciseMode && exerciseType === 'quiz'"
    mat-button
    class="practice-btn"
    [routerLink]="['/exercises/quiz', 'word-group', group.id]"
    routerLinkActive="mat-accent"
  >
    Practice
  </button>
  `,
  styles: [
  ]
})
export class GroupActionPanelComponent {

}
