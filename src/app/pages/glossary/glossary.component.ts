import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { Observable, Subscription, combineLatest, map } from 'rxjs';
import { Group, getGroups } from '@app/store/groups';
import { Word, getWords, getWordsByGroupId } from '@app/store/words';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-glossary',
  standalone: true,

  imports: [CommonModule, MatExpansionModule],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
})
export class GlossaryComponent implements OnInit {
  //tododelete
  editMode: Boolean = false;
  groupEdit: Boolean = false;
  groupEditId: String;
  newWordMode: Boolean = false;
  newGroupMode: Boolean = false;
  translationsOpen: Boolean = false;
  translationArrOpen: String[] = [];

  exerciseTypeSub: Subscription;
  exerciseType: string;

  exerciseMode = false;
  urlArr = [];
  // groups$: Observable<any>;
  // words$;
  groupsAndWords$: Observable<{ group: Group, words$: Observable<Word[]> }[]>;

  constructor(
    private store: Store,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.urlArr = this.router.url.split('/');
    if (this.urlArr[this.urlArr.length - 1] === 'vocabulary-select') {
      this.exerciseMode = true;
    }
    // this.words$ = this.wordService.getWordsFromServer();
    // this.words = this.words$.then((words) => words);
    this.groupsAndWords$ = this.store.select(getGroups).pipe(
      map((groups) => {
        return groups.map((group) => {
          console.log("------>>>>>>>>>>>>>", group)
          return {
            group,
            words$: this.store.select(getWordsByGroupId(group.id))
          }
        })
      })
    );

  }

  // To hide collapse all button on 0 additional translates groups
  areThereAddTr(groupId) {
    // let thereAre =
    //   this.getGroupWords(groupId).filter(
    //     (word) => word.additionalTr.length > 0
    //   ).length !== 0;
    // return thereAre;
  }

  async conditionalForSeeAll() {
    // let totWordWithAddTr = this.words.filter(
    //   (word) => word.additionalTr.length > 0
    // ).length;
    // let visible = totWordWithAddTr !== this.translationArrOpen.length;
    // return visible;
  }
  changePanReset() {
    // this.wordEditId = null;
    this.groupEdit = false;
    this.newWordMode = false;
    this.editMode = false;
    this.closeAllTranslations();
  }

  openAllTranslations() {
    // const allWordIds = this.words
    //   .filter((word) => word.additionalTr.length > 0)
    //   .map((word) => word.id);
    // this.translationArrOpen.length = 0;
    // this.translationArrOpen = allWordIds;
  }

  closeAllTranslations() {
    this.translationArrOpen.length = 0;
  }

  onEditMode(groupId) {
    // this.wordEditId = null;
    this.groupEdit = false;
    this.newWordMode = false;
    this.closeAllTranslations();

    if (this.groupEditId === groupId && this.editMode === true) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
    this.groupEditId = groupId;
  }

  onDeleteGroup(groupName, groupId) {
    if (confirm('Are you sure you want to delete ' + groupName)) {
      // this.groupService.deleteGroup(groupId).subscribe(() => {
      //   // this.groupService.loadGroups();
      // });
    }
  }

  onEditGroupName() {
    this.groupEdit = !this.groupEdit;
  }

  onAddNewWord() {
    this.newWordMode = true;
  }

  // Conditionals for ngIf
  // Groups
  hideOnEdit(groupId) {
    return (
      this.editMode === false ||
      (this.editMode === true && this.groupEditId !== groupId)
    );
  }

  showOnEdit(groupId) {
    return this.editMode === true && this.groupEditId === groupId;
  }

  preventCollapse(groupId) {
    if (this.groupEditId === groupId) {
      return true;
    }
  }

  hideOnGroupEdit(groupId) {
    return this.groupEdit === true && this.groupEditId === groupId;
  }
}
