import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { LetModule } from '@ngrx/component';


import { GlossaryState } from './glossary.state';
import { WordGridComponent, WordGridInputInterface } from './components/word-grid/word-grid.component';
import { GroupActionPanelComponent } from './components/group-action-panel/group-action-panel.component';
import { WordUiViewInputInterface } from './components/word-grid/components';
import { GlossaryStateFacade } from './glossary.state.facade';
import { Group } from '../store/groups-list';
import { Observable } from 'rxjs/internal/Observable';
import { Word } from '../store/words-list/words.models';



export interface GlossaryStateInterface {
  groupsAndWords: { group: Group, words$: Observable<Word[]> }[];
}

@Component({
  selector: 'app-glossary',
  standalone: true,

  imports: [CommonModule, MatExpansionModule, WordGridComponent, MatIconModule, GroupActionPanelComponent, LetModule],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
  providers: [GlossaryState, GlossaryStateFacade],
})

export class GlossaryComponent {

  // [groupId]="groupsAndWords.group.id"
  // [groupEditId]="groupEditId"
  // [editMode]="editMode"
  // [newWordMode]="newWordMode"
  // [words]="groupsAndWords.words$ | async"
  // [score]="groupsAndWords.group.averageProficiency"
  // [expanded]="preventCollapse(groupsAndWords.group.id)"

  constructor(
    public state: GlossaryStateFacade,
  ) { }
  // wordGridInterface: WordGridComponentInterface = this.GlossaryState.wordGridInterface;
  // wordUiInterface: WordUiComponentInterface = this.GlossaryState.wordUiInterface;

  preventCollapse() { }
  // To hide collapse all button on 0 additional translates groups

  groupAction(params) {
    switch (params.option) {
      case "unfoldTranslations":
        this.state.unfoldTranslationsGroup(params.id)
        break;
      case "foldTranslations":
        this.state.foldTranslationsGroup()
        break;
      case "edit":
        this.state.foldTranslationsGroup()
        this.state.toggleEditGroup(params.id)
        break;
      case "done":
        this.state.toggleEditGroup(params.id)
        break;
      case "delete":
        if (confirm('Are you sure you want to delete ')) {
          this.state.deleteGroup(params.id);
        }
        break;
    }
  }


}
