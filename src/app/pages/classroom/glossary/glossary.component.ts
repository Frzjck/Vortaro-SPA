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
import { GlossaryGroupPanelAction } from './components/group-action-panel/group-action-panel.actions';
import { UnknownPageWordAction } from '../store/words-list/words.actions';
import { GroupFormComponent } from './components/group-form/group-form.component';
import { StopPropagationDirective } from '@app/shared/directives/stop-propagation.directive';



export interface GlossaryStateInterface {
  groupsAndWords: { group: Group, words$: Observable<Word[]> }[];
}

@Component({
  selector: 'app-glossary',
  standalone: true,

  imports: [CommonModule, MatExpansionModule, WordGridComponent, MatIconModule, GroupActionPanelComponent, LetDirective, GroupFormComponent, StopPropagationDirective],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
})

export class GlossaryComponent {

  groupsAndWords$ = this.store.select(selectGroupsAndWords)

  groupActionPanelVM$ = (groupId) => this.store.select(selectGroupActionPanelVM(groupId));
  isEditingCurrentGroup$ = (groupId) => this.store.select(selectIsEditingCurrentGroup(groupId));
  isRenamingCurrentGroup$ = (groupId) => this.store.select(selectIsRenamingCurrentGroup(groupId));
  isNewGroupMode$ = this.store.select(selectNewGroupMode);



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

  trackByFn = (index: number, group: any): any => group.id;

}

// expandedStates: Map<any, boolean> = new Map();
// isPanelExpanded = (groupId: any): boolean => this.expandedStates.get(groupId) || false;
// [expanded]="isPanelExpanded(group.id)"
// (opened)="expandedStates.set(group.id, true)"
// (closed)="expandedStates.set(group.id, false)"