import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { animate, style, transition, trigger } from '@angular/animations';
import { ExtraTrCardComponent } from './components/extra-tr-card/extra-tr-card.component';
import { WordUiComponent } from './components/word-ui/word-ui.component';
import { LetDirective } from '@ngrx/component';
import { WordFormComponent } from './components/word-form/word-form.component';
import { Observable } from 'rxjs';
import { Word } from '@classroom/store/words-list/words.models';
import { Store } from '@ngrx/store';
import { GlossaryWordUIAction } from '@glossary/store/glossary/glossary.actions';
import { selectWordGridStateVM, selectIsWordUnfolded, selectIsEditingGroupWithId } from '@glossary/store/glossary/glossary.reducer';


export interface WordGridInputInterface {
  groupId: string;
  words: Word[];
}

export interface WordGridStateInterface {
  editingGroupId: string;
  editingWordId: string;
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

  wordGridStateVM$: Observable<WordGridStateInterface> = this.store.select(selectWordGridStateVM);

  isWordUnfolded$ = (wordId) => this.store.select(selectIsWordUnfolded(wordId));
  isEditingGroup$ = (groupId) => this.store.select(selectIsEditingGroupWithId(groupId));

  constructor(public store: Store) { }

  wordAction(params) {
    switch (params.option) {
      case "unfoldTranslations":
        this.store.dispatch(GlossaryWordUIAction.unfoldAdditionalTranslationsWord({ wordId: params.id }));
        break;
      case "foldTranslations":
        this.store.dispatch(GlossaryWordUIAction.foldAdditionalTranslationsWord({ wordId: params.id }));
        break;
      case "edit":
        this.store.dispatch(GlossaryWordUIAction.editWord({ wordId: params.id }))
        break;
      case "delete":
        if (confirm('Are you sure you want to delete ')) {
          this.store.dispatch(GlossaryWordUIAction.deleteWord({ wordId: params.id }))
        }
        break;
    }
  }



  hasAddTranslations(word) {
    return word?.additionalTranslations?.length > 0
  }
  onAddNewWord() { }


  onDeleteWord(id) {

  }




}

