import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { animate, style, transition, trigger } from '@angular/animations';
import { ExtraTrCardComponent } from './components/extra-tr-card/extra-tr-card.component';
import { WordUiComponent, WordUiViewInputInterface } from './components/word-ui/word-ui.component';
import { Word } from '@app/pages/classroom/store/words-list';
import { GlossaryStateFacade } from '../../glossary.state.facade';
import { Observable, of } from 'rxjs';
import { LetModule } from '@ngrx/component';


export interface WordGridInputInterface {
  groupId: string;
  words: Word[];
}

export interface WordGridStateInterface {
  editingGroupId: string;
  isEditingGroup: boolean;
  isAddingNewWord: boolean;
}

@Component({
  selector: 'app-word-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, ExtraTrCardComponent, WordUiComponent, MatIconModule, LetModule],
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
export class WordGridComponent {
  @Input() wordGridInput: WordGridInputInterface;
  wordGridState$: Observable<WordGridStateInterface> = this.state.wordGridState$;


  // iconPressed = (event) => console.log(event);

  constructor(public state: GlossaryStateFacade) {
  }

  wordAction(params) {
    switch (params.option) {
      case "unfoldTranslations":
        this.state.unfoldTranslationsWord(params.id)
        break;
      case "foldTranslations":
        this.state.foldTranslationsWord(params.id)
        break;
      case "edit":
        // this.onEditWord(params.id)
        break;
      case "delete":
        if (confirm('Are you sure you want to delete ')) {
          this.state.deleteWord(params.id)
        }
        break;
    }
  }

  hasAddTranslations(word) {
    return word?.additionalTr?.length > 0
  }


  // if (params.option === "unfoldTranslations") {
  //   console.log("piu piu piu")
  //   // this.toggleTranslations(params.id)
  // }
  // else if (params.option === "onEditWord") {
  //   console.log("not piu piu piu")

  //   // this.onEditWord(params.id)
  // }
  // else if (params.option === "foldTranslations") {
  //   // this.onDeleteWord(params.id)
  // }
  // else if (params.option === "onDeleteWord") {
  //   // this.onDeleteWord(params.id)
  // }

  onAddNewWord() { }


  onDeleteWord(id) {

  }




}

