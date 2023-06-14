import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { LetDirective } from '@ngrx/component';


import { WordGridComponent } from './components/word-grid/word-grid.component';
import { GroupActionPanelComponent } from './components/group-action-panel/group-action-panel.component';
import { Observable } from 'rxjs/internal/Observable';
import { Word } from '../store/words-list/words.models';
import { Store } from '@ngrx/store';
import { selectGroupActionPanelVM, selectGroupsAndWords, selectIsEditingCurrentGroup } from './store/glossary/glossary.reducer';
import { Group } from '@classroom/store/groups-list/groups.models';
import { UnknownPageGroupAction } from '@classroom/store/groups-list/groups.actions';
import { UnknownPageWordAction } from '@classroom/store/words-list/words.actions';
import { GlossaryGroupPanelAction } from './components/group-action-panel/group-action-panel.actions';



export interface GlossaryStateInterface {
  groupsAndWords: { group: Group, words$: Observable<Word[]> }[];
}

@Component({
  selector: 'app-glossary',
  standalone: true,

  imports: [CommonModule, MatExpansionModule, WordGridComponent, MatIconModule, GroupActionPanelComponent, LetDirective],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
})

export class GlossaryComponent {

  groupsAndWords$ = this.store.select(selectGroupsAndWords)

  groupActionPanelVM$ = (groupId) => this.store.select(selectGroupActionPanelVM(groupId));
  isEditingCurrentGroup$ = (groupId) => this.store.select(selectIsEditingCurrentGroup(groupId));

  constructor(public store: Store) { }

  ngOnInit(): void {
    //Todo delete after testing
    setTimeout(() => {
      this.store.dispatch(UnknownPageGroupAction.readGroups());
    }, 1200);
    setTimeout(() => {
      this.store.dispatch(UnknownPageWordAction.readWords());
    }, 800);
  }

  preventCollapse() { }

  groupAction(params) {
    switch (params.option) {
      case "unfoldTranslations":
        this.store.dispatch(GlossaryGroupPanelAction.unfoldAdditionalTranslationsGroup({ groupId: params.id }))
        break;
      case "foldTranslations":
        this.store.dispatch(GlossaryGroupPanelAction.foldAdditionalTranslationsGroup())
        break;
      case "edit":
        this.store.dispatch(GlossaryGroupPanelAction.toggleEditGroup({ groupId: params.id }))
        break;
      case "done":
        this.store.dispatch(GlossaryGroupPanelAction.toggleEditGroup({ groupId: params.id }))
        break;
      case "delete":
        if (confirm('Are you sure you want to delete ')) {
          this.store.dispatch(GlossaryGroupPanelAction.deleteGroup({ groupId: params.id }))
        }
        break;
    }
  }


}
