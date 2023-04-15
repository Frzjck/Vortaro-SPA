import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { Subscription } from 'rxjs';
import { UserService } from '@app/pages/login/user.service';
import { GroupService } from '@app/services/group.service';
import { WordService } from '@app/services/word.service';
import { Group } from '@app/store/groups';
import { Word } from '@app/store/words';

@Component({
  selector: 'app-glossary',
  standalone: true,

  imports: [CommonModule, MatExpansionModule],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
})
export class GlossaryComponent implements OnInit {
  //tododelete
  groups: Group[] = [];
  words: Word[] = [];
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
  groups$;
  words$;

  constructor(
    public groupService: GroupService,
    private wordService: WordService,
    public userService: UserService
  ) { }

  ngOnInit(): void {

    this.groups$ = this.groupService.loadGroups();
    // this.words$ = this.wordService.getWordsFromServer();
    // this.words = this.words$.then((words) => words);

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
    let totWordWithAddTr = this.words.filter(
      (word) => word.additionalTr.length > 0
    ).length;
    let visible = totWordWithAddTr !== this.translationArrOpen.length;
    return visible;
  }
  changePanReset() {
    // this.wordEditId = null;
    this.groupEdit = false;
    this.newWordMode = false;
    this.editMode = false;
    this.closeAllTranslations();
  }

  openAllTranslations() {
    const allWordIds = this.words
      .filter((word) => word.additionalTr.length > 0)
      .map((word) => word.id);
    this.translationArrOpen.length = 0;
    this.translationArrOpen = allWordIds;
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
      this.groupService.deleteGroup(groupId).subscribe(() => {
        // this.groupService.loadGroups();
      });
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
