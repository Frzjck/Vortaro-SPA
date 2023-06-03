import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlossaryState } from './glossary.state';
import { Observable, take } from 'rxjs';
import { WordGridStateInterface } from './components/word-grid/word-grid.component';
import { GlossaryStateInterface } from './glossary.component';
import { deleteWord } from '../store/words-list/words.actions';
import { deleteGroup, editGroup } from '../store/groups-list/groups.actions';
import { selectGroupById } from '../store/groups-list';



@Injectable(
)
export class GlossaryStateFacade {
    constructor(private store: Store, private glossaryState: GlossaryState) { }

    // ViewModels and Interfaces:
    wordGridStateVM$: Observable<WordGridStateInterface> = this.glossaryState.wordGridStateVM$;
    glossaryState$: Observable<GlossaryStateInterface> = this.glossaryState.glossaryState$;

    // CRUD operations:
    toggleEditGroup = (groupId: string) => this.glossaryState.toggleEditGroup(groupId);
    deleteWord = (wordId: string) => this.store.dispatch(deleteWord({ id: wordId }));
    deleteGroup = (groupId: string) => this.store.dispatch(deleteGroup({ id: groupId }));


    // Editing:
    isEditingGroup$ = () => this.glossaryState.isEditingGroup$;
    isEditingGroupId$ = (groupId: string) => this.glossaryState.isEditingGroupId$(groupId);

    selectEditingWordId$ = () => this.glossaryState.editingWordId$;
    editWord = (wordId: string) => { this.glossaryState.editWord(wordId) };
    // Addition translations fold/unfold
    isWordUnfolded$ = (wordId: string) => this.glossaryState.isWordUnfolded$(wordId);

    groupHasUnfoldedTranslations$ = (groupId: string) => this.glossaryState.groupHasUnfoldedTranslations$(groupId);

    isAllGroupTranslationsUnfolded$ = (groupId: string) => this.glossaryState.isAllGroupTranslationsUnfolded$(groupId);

    foldTranslationsWord = (wordId: string) => this.glossaryState.foldTranslationsWord(wordId);
    unfoldTranslationsWord = (wordId: string) => this.glossaryState.unfoldTranslationsWord(wordId);

    unfoldTranslationsGroup = (groupId: string) =>
        this.store.select(selectGroupById(groupId)).pipe(take(1)).subscribe((group) => {
            this.glossaryState.setUnfoldedTranslationsGroup(group.wordIds);
        });
    foldTranslationsGroup = () => this.glossaryState.foldTranslationsGroup();
}