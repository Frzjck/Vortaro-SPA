import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { LetDirective } from '@ngrx/component';


import { GlossaryState } from './glossary.state';
import { WordGridComponent } from './components/word-grid/word-grid.component';
import { GroupActionPanelComponent } from './components/group-action-panel/group-action-panel.component';
import { GlossaryStateFacade } from './glossary.state.facade';
import { Observable } from 'rxjs/internal/Observable';
import { Word } from '../store/words-list/words.models';
import { combineLatest, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectGroupHasUnfoldedTranslations, selectGroupsAndWords, selectIsAllGroupTranslationsUnfolded, selectIsEditingGroupWithId } from './store/glossary/glossary.reducer';
import { GlossaryGroupPanelAction } from './store/glossary/glossary.actions';
import { Group } from '@classroom/store/groups-list/groups.models';
import { UnknownPageGroupAction } from '@classroom/store/groups-list/groups.actions';
import { UnknownPageWordAction } from '@classroom/store/words-list/words.actions';



export interface GlossaryStateInterface {
  groupsAndWords: { group: Group, words$: Observable<Word[]> }[];
}

@Component({
  selector: 'app-glossary',
  standalone: true,

  imports: [CommonModule, MatExpansionModule, WordGridComponent, MatIconModule, GroupActionPanelComponent, LetDirective],
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss'],
  providers: [GlossaryState, GlossaryStateFacade],
})

export class GlossaryComponent {

  groupsAndWords$ = this.store.select(selectGroupsAndWords)

  constructor(public state: GlossaryStateFacade, public store: Store) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(() => {
      this.store.dispatch(UnknownPageGroupAction.readGroups());
    }, 1200);
    setTimeout(() => {
      this.store.dispatch(UnknownPageWordAction.readWords());
    }, 800);
  }

  getGroupActionInput(groupId) {
    return combineLatest([
      of(groupId),
      this.store.select(selectIsAllGroupTranslationsUnfolded(groupId)),
      this.store.select(selectGroupHasUnfoldedTranslations(groupId)),
      this.store.select(selectIsEditingGroupWithId(groupId)),
    ]).pipe(
      map(([groupId, isAllOpen, isAnyOpen, isBeingEdited]) => {
        return {
          groupId: groupId,
          seeAll: !isAllOpen && !isBeingEdited,
          collapseAll: isAnyOpen && !isBeingEdited,
          done: isBeingEdited,
          delete: isBeingEdited,
        }
      }))
  }

  preventCollapse() { }
  // To hide collapse all button on 0 additional translates groups

  groupAction(params) {
    switch (params.option) {
      case "unfoldTranslations":
        // this.state.unfoldTranslationsGroup(params.id)
        this.store.dispatch(GlossaryGroupPanelAction.unfoldAdditionalTranslationsGroup({ groupId: params.id }))
        break;
      case "foldTranslations":
        // this.state.foldTranslationsGroup()
        this.store.dispatch(GlossaryGroupPanelAction.foldAdditionalTranslationsGroup())

        break;
      case "edit":
        // this.state.foldTranslationsGroup()
        // this.state.toggleEditGroup(params.id)

        this.store.dispatch(GlossaryGroupPanelAction.foldAdditionalTranslationsGroup())
        this.store.dispatch(GlossaryGroupPanelAction.toggleEditGroup({ groupId: params.id }))

        break;
      case "done":
        // this.state.toggleEditGroup(params.id)
        this.store.dispatch(GlossaryGroupPanelAction.toggleEditGroup({ groupId: params.id }))

        break;
      case "delete":
        if (confirm('Are you sure you want to delete ')) {
          // this.state.deleteGroup(params.id);
          this.store.dispatch(GlossaryGroupPanelAction.deleteGroup({ groupId: params.id }))
        }
        break;
    }
  }


}
