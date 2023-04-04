import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { GroupService } from '../services/group.service';
import { WordManageService } from '../services/word-manage.service';
import { SettingsService } from '../services/settings.service';

import { Group } from '../models/group-model';
import { Word } from '../models/word-model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-vocab',
  templateUrl: './my-vocab.component.html',
  styleUrls: ['./my-vocab.component.scss'],
  animations: [
    trigger('expandDown', [
      transition('void => *', [
        style({ height: 0, padding: 0 }),
        animate('400ms cubic-bezier(.49,.99,.27,.98)'),
      ]),
      transition('* => void', [
        animate(
          '400ms cubic-bezier(.49,.99,.27,.98)',
          style({ height: 0, padding: 0 })
        ),
      ]),
    ]),
  ],
})
export class MyVocabComponent implements OnInit, OnDestroy {
  groups: Group[] = [];
  words: Word[] = [];
  editMode: Boolean = false;
  groupEdit: Boolean = false;
  wordEdit: Boolean = false;
  groupEditId: String;
  wordEditId: String;
  newWordMode: Boolean = false;
  newGroupMode: Boolean = false;
  translationsOpen: Boolean = false;
  translationArrOpen: String[] = [];

  exerciseTypeSub: Subscription;
  exerciseType: string;

  exerciseMode = false;
  urlArr = [];

  private groupSub: Subscription;
  private wordSub: Subscription;

  constructor(
    public groupService: GroupService,
    private wordService: WordManageService,
    private settings: SettingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.urlArr = this.router.url.split('/');
    if (this.urlArr[this.urlArr.length - 1] === 'vocabulary-select') {
      this.exerciseMode = true;
    }
    // Subscribe to groups
    this.groupSub = this.groupService
      .loadGroups()
      .subscribe((groups) => {
        this.groups = groups;
      });

    // Subscribe to words
    this.wordSub = this.wordService.wordsObsListener().subscribe((words) => {
      this.words = words;
    });

    // Subscribe to exercise type
    this.exerciseTypeSub = this.settings.exerciseModeSub.subscribe((type) => {
      this.exerciseType = type;
    });
  }

  ngOnDestroy(): void {
    this.groupSub.unsubscribe();
    this.wordSub.unsubscribe();
  }

  // To hide collapse all button on 0 additional translates groups
  areThereAddTr(groupNum) {
    let thereAre =
      this.getGroupWords(groupNum).filter(
        (word) => word.additionalTr.length > 0
      ).length !== 0;
    return thereAre;
  }

  conditionalForSeeAll(groupNum) {
    let totWordWithAddTr = this.getGroupWords(groupNum).filter(
      (word) => word.additionalTr.length > 0
    ).length;
    let visible = totWordWithAddTr !== this.translationArrOpen.length;
    return visible;
  }

  changePanReset() {
    this.wordEditId = null;
    this.groupEdit = false;
    this.newWordMode = false;
    this.editMode = false;
    this.closeAllTranslations();
  }

  toggleTranslations(wordId) {
    if (this.translationArrOpen.includes(wordId)) {
      this.translationArrOpen = this.translationArrOpen.filter(
        (word) => word !== wordId
      );
    } else {
      this.translationArrOpen.push(wordId);
    }
  }
  openAllTranslations(groupNum) {
    const allWordIds = this.getGroupWords(groupNum)
      .filter((word) => word.additionalTr.length > 0)
      .map((word) => word.id);
    this.translationArrOpen.length = 0;
    this.translationArrOpen = allWordIds;
  }

  closeAllTranslations() {
    this.translationArrOpen.length = 0;
  }

  getGroupWords(groupNum) {
    const words = this.words.filter((word) => word.groupNum === groupNum);
    return words;
  }

  onEditMode(groupId) {
    this.wordEditId = null;
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
        this.groupService.loadGroups();
      });
    }
  }

  onEditWord(wordId) {
    if (this.wordEditId === wordId && this.wordEdit === true) {
      this.wordEdit = false;
    } else {
      this.wordEdit = true;
    }
    this.wordEditId = wordId;
  }

  onDeleteWord(id) {
    if (confirm('Are you sure you want to delete ')) {
      this.wordService.deleteWord(id).subscribe(() => {
        this.wordService.getWordsFromServer();
        this.groupService.loadGroups();
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
  hideOnEdit(groupNum) {
    return (
      this.editMode === false ||
      (this.editMode === true && this.groupEditId !== groupNum)
    );
  }

  showOnEdit(groupNum) {
    return this.editMode === true && this.groupEditId === groupNum;
  }

  preventCollapse(groupNum) {
    if (this.groupEditId === groupNum) {
      return true;
    }
  }
  // Words
  hideOnEditWord(wordId, groupNum) {
    return (
      this.wordEdit === false ||
      (this.wordEdit === true && this.groupEditId !== groupNum) ||
      (this.wordEdit === true && this.wordEditId !== wordId)
    );
  }
  showOnEditWord(wordId, groupNum) {
    return (
      this.wordEdit === true &&
      this.wordEditId === wordId &&
      this.groupEditId === groupNum
    );
  }
  hideOnGroupEdit(groupNum) {
    return this.groupEdit === true && this.groupEditId === groupNum;
  }
}
