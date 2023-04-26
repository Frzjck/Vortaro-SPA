import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Word, getWords, getWordsByGroupId } from '@app/pages/classroom/store/words-list';
// import { Group, getGroups } from '@app/pages/classroom/store/groups-list';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, map, tap } from 'rxjs';

export interface GlossaryStateModel {
    unfoldedWords: string[];
    editingGroupId: string;
}

const initialState = {
    unfoldedWords: [],
    editingGroupId: null,
};

@Injectable()
export class GlossaryState extends ComponentStore<GlossaryStateModel> {

    constructor(private store: Store) {
        super(initialState);
    }


    // EditingGroup
    editingGroupId$ = this.select(state => state.editingGroupId);

    readonly setEditingGroup = (groupId: string) => this.patchState({ editingGroupId: groupId });
    readonly resetEditingGroup = this.updater(state => ({
        ...state,
        editingGroupId: initialState.editingGroupId,
    }));


    // UnfoldedWords
    readonly unfoldedWords$ = this.select(state => state.unfoldedWords);
    readonly isAllFolded$ = this.select(state => state.unfoldedWords.length === 0);

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
    // readonly groupsAndWordsObs$ = this.store.select(getGroups)
    // .pipe(
    //     map((groups: Group[]) => {
    //         return groups.map((group) => {
    //             return {
    //                 group,
    //                 words$: this.store.select(getWordsByGroupId(group.id))
    //             }
    //         })
    //     })
    // )

    // readonly groupsAndWords$ = this.select(
    //     // this.groupsAndWordsObs$,
    //     this.store.select(getGroups),
    //     (groupsAndWordsObs) => {
    //         console.log("aaaaaaaaaa", groupsAndWordsObs);
    //         return groupsAndWordsObs;
    //     }
    // )


}