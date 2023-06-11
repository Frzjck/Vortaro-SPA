import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { UnknownPageGlossaryAction } from "./glossary.actions";
import { Observable } from "rxjs";
import { WordGridStateInterface } from "../../components/word-grid/word-grid.component";

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



export const exercisesFeature = createFeature({
    name: "glossary",
    reducer: createReducer(
        initialState,
        on(UnknownPageGlossaryAction.foldAdditionalTranslationsGroup, (state) => ({
            ...state,
            unfoldedWords: initialState.unfoldedWords,
        })),

        on(UnknownPageGlossaryAction.foldAdditionalTranslationsWord, (state, { wordId }) => ({
            ...state,
            unfoldedWords: state.unfoldedWords.filter((id) => id !== wordId),
        })),

        on(UnknownPageGlossaryAction.unfoldAdditionalTranslationsGroup, (state, { wordIds }) => ({
            ...state,
            unfoldedWords: wordIds,
        })),

        on(UnknownPageGlossaryAction.unfoldAdditionalTranslationsWord, (state, { wordId }) => ({
            ...state,
            unfoldedWords: state.unfoldedWords.concat(wordId),
        })),

        on(UnknownPageGlossaryAction.toggleEditGroup, (state, { groupId }) => ({
            ...state,
            editingGroupId: state.editingGroupId === groupId ? null : groupId,
        })),

        on(UnknownPageGlossaryAction.finishEditGroup, (state) => ({
            ...state,
            editingGroupId: initialState.editingGroupId,
        })),

        on(UnknownPageGlossaryAction.editWord, (state, { wordId }) => ({
            ...state,
            editingWordId: wordId,
        })),

    ),

    extraSelectors: ({ selectUnfoldedWords, selectEditingGroupId, selectEditingGroupNameId, selectEditingWordId, selectAddNewWordMode }) => {


        const selectIsAllFolded = createSelector(
            selectUnfoldedWords,
            (unfoldedWords) => unfoldedWords.length === 0
        );

        const selectIsEditingWord = createSelector(
            selectEditingWordId,
            (editingWordId) => !!editingWordId
        );

        const selectIsEditingGroup = createSelector(
            selectEditingGroupId,
            (editingGroupId) => !!editingGroupId
        );

        const selectIsEditingGroupName = createSelector(
            selectEditingGroupNameId,
            (editingGroupNameId) => !!editingGroupNameId
        );

        const selectIsWordUnfolded = (wordId: string) => createSelector(
            selectUnfoldedWords,
            (unfoldedWords) => unfoldedWords.includes(wordId)
        );

        // ------------- Combined selectors & Global:

        //  groupsAndWordsObs$ = this.store.select(selectGroups)
        // .pipe(
        //     map((groups: Group[]) => {
        //         return groups.map((group) => {
        //             return {
        //                 group,
        //                 words$: this.store.select(selectWordsByIds(group.wordIds))
        //             }
        //         })
        //     })
        // )
        // readonly groupHasUnfoldedTranslations$ = (groupId: string) => this.select(
        //     this.unfoldableGroupWords$(groupId),
        //     this.unfoldedWords$,
        //     (groupWords, unfoldedWords) => {
        //         return unfoldedWords.some((wordId) => groupWords.some((word) => word.id === wordId));
        //     }
        // )

        // readonly isAllGroupTranslationsUnfolded$ = (groupId: string) => this.select(
        //     this.unfoldableGroupWords$(groupId),
        //     this.unfoldedWords$,
        //     (groupWords, unfoldedWords) => {
        //         return groupWords.every((word) => unfoldedWords.some((wordId) => word.id === wordId));
        //     }
        // )

        const selectWordGridStateVM = createSelector(
            selectEditingGroupId,
            selectEditingWordId,
            selectIsEditingGroup,
            selectAddNewWordMode,
            (editingGroupId, editingWordId, isEditingGroup, isAddingNewWord) => ({
                editingGroupId,
                editingWordId,
                isEditingGroup,
                isAddingNewWord,
            })
        );


        return {
            selectWordGridStateVM
        }
    },

});





export const {
    name,
    reducer,

} = exercisesFeature;