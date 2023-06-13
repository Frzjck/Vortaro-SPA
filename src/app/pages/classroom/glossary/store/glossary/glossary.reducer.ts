import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { GlossaryGroupPanelAction, UnknownPageGlossaryAction } from "./glossary.actions";
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

        on(GlossaryGroupPanelAction.unfoldAdditionalTranslationsWords, (state, { wordIds }) => ({
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

        const selectGroupsAndWords = createSelector(
            selectGroups,
            (groups) => {
                return groups.map((group) => ({
                    ...group,
                    selectWords: selectWordsByIds(group.wordIds)
                }))
            }
        );

        const selectUnfoldableGroupWords = (groupId) => createSelector(
            selectWordsByGroupId(groupId),
            (groupWords) => groupWords.filter(
                (word) => word.additionalTranslations && word.additionalTranslations?.length > 0
            )
        );

        const selectGroupHasUnfoldedTranslations = (groupId: string) => createSelector(
            selectUnfoldableGroupWords(groupId),
            selectUnfoldedWords,
            (groupWords, unfoldedWords) => {
                return unfoldedWords.some((wordId) => groupWords.some((word) => word.id === wordId));
            }
        );

        const selectIsAllGroupTranslationsUnfolded$ = (groupId: string) => createSelector(
            selectUnfoldableGroupWords(groupId),
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
            selectWordGridStateVM,
            selectGroupsAndWords
        }
    },

});





export const {
    name,
    reducer,
    selectGroupsAndWords

} = glossaryFeature;