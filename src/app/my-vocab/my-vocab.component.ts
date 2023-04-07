import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { WordService } from '../services/word.service';
import { SettingsService } from '../services/settings.service';

import { Group } from '../models/group-model';
import { Word } from '../models/word-model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '@app/login/user.service';

@Component({
  selector: 'app-my-vocab',
  templateUrl: './my-vocab.component.html',
  styleUrls: ['./my-vocab.component.scss'],

})
export class MyVocabComponent implements OnInit, OnDestroy {
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
    private settings: SettingsService,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    // this.urlArr = this.router.url.split('/');
    // if (this.urlArr[this.urlArr.length - 1] === 'vocabulary-select') {
    //   this.exerciseMode = true;
    // }
    // Subscribe to groups
    // this.groupSub = this.groupService
    //   .loadGroups()
    //   .subscribe((groups) => {
    //     this.groups = groups;
    //   });

    // Subscribe to words
    // this.wordSub = this.wordService.wordsObsListener().subscribe((words) => {
    //   this.words = words;
    // });

    // Subscribe to exercise type
    // this.exerciseTypeSub = this.settings.exerciseModeSub.subscribe((type) => {
    //   this.exerciseType = type;
    // });
    this.groups$ = this.groupService.loadGroups();
    this.words$ = this.wordService.getWordsFromServer();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  ngOnDestroy(): void {
    // this.groupSub.unsubscribe();
    // this.wordSub.unsubscribe();
  }

  // To hide collapse all button on 0 additional translates groups
  areThereAddTr(groupId) {
    // let thereAre =
    //   this.getGroupWords(groupId).filter(
    //     (word) => word.additionalTr.length > 0
    //   ).length !== 0;
    // return thereAre;
  }

  conditionalForSeeAll(groupId) {
    // let totWordWithAddTr = this.getGroupWords(groupId).filter(
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

  openAllTranslations(groupId) {
    // const allWordIds = this.getGroupWords(groupId)
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
