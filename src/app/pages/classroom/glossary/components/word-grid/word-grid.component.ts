import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { animate, style, transition, trigger } from '@angular/animations';
import { ExtraTrCardComponent } from './components/extra-tr-card/extra-tr-card.component';
import { WordUiComponent } from './components/word-ui/word-ui.component';
import { Word } from '@app/pages/classroom/store/words-list';
import { GlossaryStateFacade } from '../../glossary.state.facade';
import { LetDirective } from '@ngrx/component';
import { WordFormComponent } from './components/word-form/word-form.component';


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
  imports: [CommonModule, MatCardModule, MatButtonModule, ExtraTrCardComponent, WordUiComponent, MatIconModule, LetDirective, WordFormComponent],
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
  // wordGridState$: Observable<WordGridStateInterface> = this.state.wordGridState$;

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
  onAddNewWord() { }


  onDeleteWord(id) {

  }




}

