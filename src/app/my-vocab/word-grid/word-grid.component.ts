import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordService } from '@app/services/word.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { animate, style, transition, trigger } from '@angular/animations';

import { ExtraTrCardComponent } from '@app/my-vocab/word-grid/extra-tr-card/extra-tr-card.component';
import { WordUiComponent } from './word-ui/word-ui.component';

@Component({
  selector: 'app-word-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, ExtraTrCardComponent, WordUiComponent],
  templateUrl: './word-grid.component.html',
  styleUrls: ['./word-grid.component.scss'],
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
export class WordGridComponent implements OnInit {
  @Input() groupId: string;
  @Input() groupEditId: string;
  @Input() editMode: boolean;
  @Input() newWordMode: boolean;

  wordEditId: String;
  wordEdit: Boolean = false;

  words$;
  translationsOpen: Boolean = false;
  translationArrOpen: String[] = [];

  constructor(private wordService: WordService) { }

  ngOnInit(): void {
    this.words$ = this.wordService.getGroupWords(this.groupId);
  }


  showOnEdit(groupId) {
    return this.editMode === true && this.groupEditId === groupId;
  }


  hideOnEdit(groupId) {
    return (
      this.editMode === false ||
      (this.editMode === true && this.groupEditId !== groupId)
    );
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
  onEditWord(wordId) {
    if (this.wordEditId === wordId && this.wordEdit === true) {
      this.wordEdit = false;
    } else {
      this.wordEdit = true;
    }
    this.wordEditId = wordId;
  }
  // Words
  hideOnEditWord(wordId, groupId) {
    return (
      this.wordEdit === false ||
      (this.wordEdit === true && this.groupEditId !== groupId) ||
      (this.wordEdit === true && this.wordEditId !== wordId)
    );
  }
  showOnEditWord(wordId, groupId) {
    return (
      this.wordEdit === true &&
      this.wordEditId === wordId &&
      this.groupEditId === groupId
    );
  }
  onDeleteWord(id) {
    if (confirm('Are you sure you want to delete ')) {
      // this.wordService.deleteWord(id).subscribe(() => {
      //   this.wordService.getWordsFromServer();
      //   this.groupService.loadGroups();
      // });
    }
  }

  iconPressed(param) {
    if (param.option === "toggleTranslations") {
      this.toggleTranslations(param.id)
    }
    else if (param.option === "onEditWord") {
      this.onEditWord(param.id)
    }
    else if (param.option === "onDeleteWord") {
      this.onDeleteWord(param.id)
    }

  }
}

