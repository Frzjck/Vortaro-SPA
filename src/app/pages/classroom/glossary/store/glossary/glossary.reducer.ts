import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { UnknownPageGlossaryAction } from "./glossary.actions";
import { selectGroups } from "@app/pages/classroom/store/groups-list";
import { selectWordsByGroupId, selectWordsByIds } from "@app/pages/classroom/store/words-list";

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



export const glossaryFeature = createFeature({
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

        // ------------- Containing Global Selectors:

        const groupsAndWordsObs = createSelector(
            selectGroups,
            (groups) => groups.map((group) => ({
                group,
                words$: selectWordsByIds(group.wordIds)
            }))
        );

        const unfoldableGroupWords = (groupId) => createSelector(
            selectWordsByGroupId(groupId),
            (groupWords) => groupWords.filter(
                (word) => word.additionalTranslations && word.additionalTranslations?.length > 0
            )
        );

        const groupHasUnfoldedTranslations = (groupId: string) => createSelector(
            unfoldableGroupWords(groupId),
            selectUnfoldedWords,
            (groupWords, unfoldedWords) => {
                return unfoldedWords.some((wordId) => groupWords.some((word) => word.id === wordId));
            }
        );

        const isAllGroupTranslationsUnfolded$ = (groupId: string) => createSelector(
            unfoldableGroupWords(groupId),
            selectUnfoldedWords,
            (groupWords, unfoldedWords) => {
                return groupWords.every((word) => unfoldedWords.some((wordId) => word.id === wordId));
            }
        )

        // ------------- View Models:

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

} = glossaryFeature;