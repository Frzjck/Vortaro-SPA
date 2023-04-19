import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { editGroup, isEditingGroup } from '@app/store/groups';
import { Store } from '@ngrx/store';
import { getExerciseType } from '@app/store/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-group-action-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
   <button
    *ngIf="conditionalForSeeAll(group.id) && (editMode|async) === false"
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
      (editMode|async) === false &&
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
    (click)="onEditMode()"
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
    *ngIf="exerciseMode && (exerciseType | async) === 'spelling'"
    mat-button
    class="practice-btn"
    [routerLink]="['/exercises/spelling', 'word-group', group.id]"
    routerLinkActive="mat-accent"
  >
    Practice
  </button>
  <button
    *ngIf="exerciseMode && (exerciseType | async) === 'quiz'"
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


  constructor(public store: Store) { }

  @Input() groupId: string;
  @Input() exerciseMode: boolean;

  exerciseType: Observable<any>;
  editMode: Observable<boolean>;

  onEditMode() {
    this.store.dispatch(editGroup({ groupId: this.groupId }));
  }

  ngOnInit(): void {
    this.exerciseType = this.store.select(getExerciseType);
    this.editMode = this.store.select(isEditingGroup);
  }
}
