import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { getWordsByGroupId } from '@app/pages/classroom/store/words-list';
import { Group, getGroups } from '@app/pages/classroom/store/groups-list';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { WordGridViewInterface } from './components/word-grid/word-grid.component';
import { GlossaryViewInterface } from './glossary.component';

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
    // State selectors:
    readonly unfoldedWords$ = this.select(state => state.unfoldedWords);

    readonly editingGroupId$ = this.select(state => state.editingGroupId);
    readonly editingWordId$ = this.select(state => state.editingWordId);
    readonly isAddingNewWord$ = this.select(state => state.addNewWordMode);

    // Global state selectors:
    readonly groupsAndWordsObs$ = this.store.select(getGroups)
        .pipe(
            map((groups: Group[]) => {
                return groups.map((group) => {
                    return {
                        group,
                        words$: this.store.select(getWordsByGroupId(group.id))
                    }
                })
            })
        )


    // Combined selectors:
    readonly isAllFolded$ = this.select(state => state.unfoldedWords.length === 0);

    readonly isEditingWord$ = this.select(state => !!state.editingWordId);
    readonly isEditingGroup$ = this.select(state => !!state.editingGroupId);
    readonly isEditingGroupName$ = this.select(state => !!state.editingGroupNameId);

    readonly groupsAndWords$ = this.select(
        this.groupsAndWordsObs$,
        // this.store.select(getGroups),
        (groupsAndWordsObs) => {
            return groupsAndWordsObs;
        }
    )

    // ViewModels and Interfaces:
    readonly wordGridView$: Observable<WordGridViewInterface> = this.select(
        this.editingGroupId$,
        this.isEditingGroup$,
        this.isAddingNewWord$,
        (editingGroupId, isEditingGroup, isAddingNewWord) => ({
            isEditingGroup,
            editingGroupId,
            isAddingNewWord,
        })
    );
    // : Observable<GlossaryViewInterface>

    readonly glossaryView$: Observable<GlossaryViewInterface> = this.select(
        this.groupsAndWords$,
        (groupsAndWords) => ({
            groupsAndWords: groupsAndWords,
        })
    );



    // Updaters:

    // Effects:


    readonly setEditingGroup = (groupId: string) => this.patchState({ editingGroupId: groupId });
    readonly resetEditingGroup = this.updater(state => ({
        ...state,
        editingGroupId: initialState.editingGroupId,
    }));

    // readonly wordUiInterface = this.select(state => state.editingGroupId)




    // UnfoldedWords


    readonly foldAllWords = this.updater(state => ({
        ...state,
        unfoldedWords: initialState.unfoldedWords,
    }));

    readonly foldWord = this.updater((state, wordId: string) => ({
        ...state,
        unfoldedWords: state.unfoldedWords.filter((id) => id !== wordId),
    }));
    readonly unfoldWord = this.updater((state, wordId: string) => ({
        ...state,
        unfoldedWords: state.unfoldedWords.concat(wordId),
    }));
    readonly setUnfoldedWords = this.updater((state, wordIds: string[]) => ({
        ...state,
        unfoldedWords: wordIds,
    }));

    // readonly unfoldAll = (groupId: string) => this.effect<void>(
    //     $ => $.pipe(
    //         exhaustMap(() => this.store.select(getWordsByGroupId(groupId)).pipe(
    //             tapResponse(
    //                 (words: Word[]) => {
    //                     const wordIds = words.map(word => word.id)
    //                     return this.setUnfoldedWords(wordIds)
    //                 },
    //                 (error) => console.log(error),
    //             )
    //         )
    //         )
    //     )
    // );

    // GroupsAndWords



}