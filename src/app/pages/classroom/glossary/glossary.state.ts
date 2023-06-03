import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { selectWordsByGroupId, selectWordsByIds } from '@app/pages/classroom/store/words-list';
import { Group, selectGroups } from '@app/pages/classroom/store/groups-list';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { WordGridStateInterface } from './components/word-grid/word-grid.component';
import { GlossaryStateInterface as GlossaryStateInterface } from './glossary.component';
// So far, it seems like the primary function of component store is to store state for a replicable component, so each copy would have its own state
export interface GlossaryStateModel {
    unfoldedWords: string[];

    editingGroupId: string;
    editingGroupNameId: string;
    editingWordId: string;
    addNewWordMode: boolean;
}

const initialState = {
    unfoldedWords: [],

    editingGroupId: null,
    editingGroupNameId: null,
    editingWordId: null,
    addNewWordMode: false,
};

@Injectable()
export class GlossaryState extends ComponentStore<GlossaryStateModel> {

    constructor(private store: Store) {
        super(initialState);
    }
    // ------------- State selectors:
    readonly unfoldedWords$ = this.select(state => state.unfoldedWords);

    readonly editingGroupId$ = this.select(state => state.editingGroupId);
    readonly editingWordId$ = this.select(state => state.editingWordId);
    readonly isAddingNewWord$ = this.select(state => state.addNewWordMode);

    // ------------- Global state selectors:
    readonly groupsAndWordsObs$ = this.store.select(selectGroups)
        .pipe(
            map((groups: Group[]) => {
                return groups.map((group) => {
                    return {
                        group,
                        words$: this.store.select(selectWordsByIds(group.wordIds))
                    }
                })
            })
        )


    // ------------- Transformative single level selectors:
    readonly isAllFolded$ = this.select(state => state.unfoldedWords.length === 0);

    readonly isEditingWord$ = this.select(state => !!state.editingWordId);
    readonly isEditingGroup$ = this.select(state => !!state.editingGroupId);
    readonly isEditingGroupId$ = (groupId) => this.select(state => state.editingGroupId === groupId);
    readonly isEditingGroupName$ = this.select(state => !!state.editingGroupNameId);

    // get only unfoldable group words
    readonly unfoldableGroupWords$ = (groupId) => this.select(
        this.store.select(selectWordsByGroupId(groupId)),
        (groupWords) => {
            return groupWords.filter((word) => word.additionalTr && word.additionalTr?.length > 0)
        }
    )

    readonly isWordUnfolded$ = (wordId: string) => this.select(state => state.unfoldedWords.includes(wordId));

    // ------------- Combined selectors:
    readonly groupHasUnfoldedTranslations$ = (groupId: string) => this.select(
        this.unfoldableGroupWords$(groupId),
        this.unfoldedWords$,
        (groupWords, unfoldedWords) => {
            return unfoldedWords.some((wordId) => groupWords.some((word) => word.id === wordId));
        }
    )

    readonly isAllGroupTranslationsUnfolded$ = (groupId: string) => this.select(
        this.unfoldableGroupWords$(groupId),
        this.unfoldedWords$,
        (groupWords, unfoldedWords) => {
            return groupWords.every((word) => unfoldedWords.some((wordId) => word.id === wordId));
        }
    )

    readonly groupsAndWords$ = this.select(
        this.groupsAndWordsObs$,
        // this.store.select(getGroups),
        (groupsAndWordsObs) => {
            return groupsAndWordsObs;
        }
    )

    // ------------- ViewModels and Interfaces:
    readonly wordGridStateVM$: Observable<WordGridStateInterface> = this.select(
        this.editingGroupId$,
        this.editingWordId$,
        this.isEditingGroup$,
        this.isAddingNewWord$,
        (editingGroupId, editingWordId, isEditingGroup, isAddingNewWord) => ({
            isEditingGroup,
            editingWordId,
            editingGroupId,
            isAddingNewWord,
        })
    );

    readonly glossaryState$: Observable<GlossaryStateInterface> = this.select(
        this.groupsAndWords$,
        (groupsAndWords) => ({
            groupsAndWords: groupsAndWords,
        })
    );

    // ------------- Updaters:
    // Addition translations fold/unfold
    readonly foldTranslationsGroup = this.updater(state => ({
        ...state,
        unfoldedWords: initialState.unfoldedWords,
    }));

    readonly setUnfoldedTranslationsGroup = this.updater((state, wordIds: string[]) => ({
        ...state,
        unfoldedWords: wordIds,
    }));

    readonly foldTranslationsWord = this.updater((state, wordId: string) => ({
        ...state,
        unfoldedWords: state.unfoldedWords.filter((id) => id !== wordId),
    }));

    readonly unfoldTranslationsWord = this.updater((state, wordId: string) => ({
        ...state,
        unfoldedWords: state.unfoldedWords.concat(wordId),
    }));

    // Editing group
    readonly toggleEditGroup = this.updater((state, groupId: string) => ({
        ...state,
        editingGroupId: state.editingGroupId === groupId ? null : groupId,
    }));

    readonly stopEditingGroup = this.updater(state => ({
        ...state,
        editingGroupId: initialState.editingGroupId,
    }));

    // Editing word
    readonly editWord = this.updater((state, wordId: string) => ({
        ...state,
        editingWordId: wordId,
    }));
}