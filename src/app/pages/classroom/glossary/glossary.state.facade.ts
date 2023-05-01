//GENERATE SERVICE
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlossaryState } from './glossary.state';
import { Observable, take } from 'rxjs';
import { WordGridStateInterface } from './components/word-grid/word-grid.component';
import { GlossaryStateInterface } from './glossary.component';
import { deleteWord } from '../store/words-list/words.actions';
import { getWordsByGroupId } from '../store/words-list/words.selectors';
import { deleteGroup, editGroup } from '../store/groups-list/groups.actions';



@Injectable(
)
export class GlossaryStateFacade {
    constructor(private store: Store, private glossaryState: GlossaryState) { }

    // ViewModels and Interfaces:
    wordGridState$: Observable<WordGridStateInterface> = this.glossaryState.wordGridState$;
    glossaryState$: Observable<GlossaryStateInterface> = this.glossaryState.glossaryState$;

    // CRUD operations:
    toggleEditGroup = (groupId: string) => this.glossaryState.toggleEditGroup(groupId);
    deleteWord = (wordId: string) => this.store.dispatch(deleteWord({ id: wordId }));
    deleteGroup = (groupId: string) => this.store.dispatch(deleteGroup({ id: groupId }));


    // Editing:
    isEditingGroup$ = () => this.glossaryState.isEditingGroup$;
    isEditingGroupId$ = (groupId: string) => this.glossaryState.isEditingGroupId$(groupId);


    // Addition translations fold/unfold
    isWordUnfolded$ = (wordId: string) => this.glossaryState.isWordUnfolded$(wordId);

    groupHasUnfoldedTranslations$ = (groupId: string) => this.glossaryState.groupHasUnfoldedTranslations$(groupId);

    isAllGroupTranslationsUnfolded$ = (groupId: string) => this.glossaryState.isAllGroupTranslationsUnfolded$(groupId);

    foldTranslationsWord = (wordId: string) => this.glossaryState.foldTranslationsWord(wordId);
    unfoldTranslationsWord = (wordId: string) => this.glossaryState.unfoldTranslationsWord(wordId);

    unfoldTranslationsGroup = (groupId: string) =>
        this.store.select(getWordsByGroupId(groupId)).pipe(take(1)).subscribe((words) => {
            let wordIds = words.map((word) => word.id);
            this.glossaryState.setUnfoldedTranslationsGroup(wordIds);
        });
    foldTranslationsGroup = () => this.glossaryState.foldTranslationsGroup();
}