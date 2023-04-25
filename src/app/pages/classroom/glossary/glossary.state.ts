import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';


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
    editingGroupId$ = this.select(state => state.editingGroupId);

    constructor() {
        super(initialState);
    }


    // EditingGroup
    readonly setEditingGroup = (groupId: string) => this.patchState({ editingGroupId: groupId });

    readonly resetEditingGroup = this.updater(state => ({
        ...state,
        editingGroupId: initialState.editingGroupId,
    }));


    // UnfoldedWords
    readonly clearUnfoldedWords = this.updater(state => ({
        ...state,
        unfoldedWords: initialState.unfoldedWords,
    }));

    readonly removeUnfoldedWords = this.updater((state, wordIds: string[]) => ({
        ...state,
        unfoldedWords: state.unfoldedWords.filter(id => !wordIds.includes(id)),
    }));

    readonly addUnfoldedWords = this.updater((state, wordIds: string[]) => ({
        ...state,
        unfoldedWords: state.unfoldedWords.concat(wordIds),
    }));



}