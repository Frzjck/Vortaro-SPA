import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromGroups from '@app/pages/classroom/store/groups-list';
import * as fromWords from '@app/pages/classroom/store/words-list';
import * as fromApp from '@app/store/app';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-group-action-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
   <button
    *ngIf="conditionalForSeeAll() && (editMode|async) === false"
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
      areThereAddTr(groupId)
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
    this.store.dispatch(fromGroups.editGroup({ groupId: this.groupId }));
  }

  ngOnInit(): void {
    this.exerciseType = this.store.select(fromApp.getExerciseType);
    // this.editMode = this.store.select(fromGlossary.isEditingGroup);
  }


  conditionalForSeeAll() {
    let groupWords$ = this.store.select(fromWords.getWordsByGroupId(this.groupId));
    // let unfoldedWords$ = this.store.select(fromGlossary.getUnfoldedWords);

    // let show$ = combineLatest([groupWords$, unfoldedWords$]).pipe(
    //   map(([words, unfolded]) => words.filter((word) => word.additionalTr.length > 0).length !== unfolded.length))

    return true;
  }

  closeAllTranslations() { }
  openAllTranslations() { }
  onDeleteGroup() { }

  //required?
  areThereAddTr(groupId: string) { }
}
