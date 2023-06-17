import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { selectGroups } from "@classroom/store/groups-list/groups.selectors";
import { selectWordsByGroupId, selectWordsByIds } from "@classroom/store/words-list/words.selectors";
import { GlossaryGroupPanelAction } from "../../components/group-action-panel/group-action-panel.actions";
import { GlossaryWordUIAction } from "../../components/word-grid/components/word-ui/word-ui.actions";
import { WordFormAction } from "../../components/word-grid/components/word-form/word-form.actions";
import { GlossaryWordGridAction } from "../../components/word-grid/word-grid.actions";
import { WordAPIResponseAction } from "@app/pages/classroom/store/words-list/words.actions";

export interface GlossaryStateModel {
    unfoldedWords: string[];

    editingGroupId: string;
    renamingGroupId: string;
    editingWordId: string;
    newWordMode: boolean;
    newGroupMode: boolean;
}

const initialState = {
    unfoldedWords: [],

    editingGroupId: null,
    renamingGroupId: null,
    editingWordId: null,
    newWordMode: false,
    newGroupMode: false,
};



export const glossaryFeature = createFeature({
    name: "glossary",
    reducer: createReducer(
        initialState,

        // --------------- Glossary  ---------------


        // --------------- Glossary Group Panel ---------------
        on(GlossaryGroupPanelAction.foldAdditionalTranslationsGroup, (state) => ({
            ...state,
            unfoldedWords: initialState.unfoldedWords,
        })),

        on(GlossaryGroupPanelAction.unfoldAdditionalTranslationsWords, (state, { wordIds }) => ({
            ...state,
            unfoldedWords: wordIds,
        })),

        on(GlossaryGroupPanelAction.toggleEditGroup, (state, { groupId }) => ({
            ...initialState,
            editingGroupId: state.editingGroupId === groupId ? null : groupId,
        })),

        // --------------- Glossary Word UI ---------------
        on(GlossaryWordUIAction.foldAdditionalTranslationsWord, (state, { wordId }) => ({
            ...state,
            unfoldedWords: state.unfoldedWords.filter((id) => id !== wordId),
        })),

        on(GlossaryWordUIAction.unfoldAdditionalTranslationsWord, (state, { wordId }) => ({
            ...state,
            unfoldedWords: state.unfoldedWords.concat(wordId),
        })),

        on(GlossaryWordUIAction.editWord, (state, { wordId }) => ({
            ...state,
            editingWordId: wordId,
        })),

        // ---------------  Word Form ---------------
        on(WordFormAction.cancelEditWord, WordAPIResponseAction.updateWordSuccess, (state) => ({
            ...state,
            editingWordId: initialState.editingWordId,
        })),

        on(WordFormAction.cancelNewWordMode, WordAPIResponseAction.createWordSuccess, (state) => ({
            ...state,
            newWordMode: false,
        })),

        // ---------------  Word Grid ---------------
        on(GlossaryWordGridAction.activateNewWordMode, (state) => ({
            ...state,
            newWordMode: true,
        })),

    ),

    extraSelectors: ({ selectUnfoldedWords, selectEditingGroupId, selectRenamingGroupId, selectEditingWordId, selectNewWordMode }) => {


        const selectIsAllFolded = createSelector(
            selectUnfoldedWords,
            (unfoldedWords) => unfoldedWords.length === 0
        );

        const selectIsEditingWord = createSelector(
            selectEditingWordId,
            (editingWordId) => !!editingWordId
        );

        const selectIsEditingCurrentGroup = (groupId) => createSelector(
            selectEditingGroupId,
            (editingGroupId) => editingGroupId === groupId
        );

        const selectIsRenamingGroup = createSelector(
            selectRenamingGroupId,
            (editingGroupNameId) => !!editingGroupNameId
        );

        const selectIsRenamingCurrentGroup = (groupId) => createSelector(
            selectRenamingGroupId,
            (renamingGroupId) => renamingGroupId === groupId
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

        const selectIsAllGroupTranslationsUnfolded = (groupId: string) => createSelector(
            selectUnfoldableGroupWords(groupId),
            selectUnfoldedWords,
            (groupWords, unfoldedWords) => {
                return groupWords.every((word) => unfoldedWords.some((wordId) => word.id === wordId));
            }
        )

        // ------------- View Models:

        const selectWordGridStateVM = (groupId: string) => createSelector(
            selectIsEditingCurrentGroup(groupId),
            selectEditingWordId,
            selectNewWordMode,
            (isEditingCurrentGroup, editingWordId, isAddingNewWord) => ({
                isEditingCurrentGroup,
                editingWordId,
                isAddingNewWord,
            })
        );

        const selectGroupActionPanelVM = (groupId) => createSelector(
            selectIsAllGroupTranslationsUnfolded(groupId),
            selectGroupHasUnfoldedTranslations(groupId),
            selectIsEditingCurrentGroup(groupId),
            (isAllOpen, isAnyOpen, isBeingEdited) => ({
                groupId,
                seeAll: !isAllOpen && !isBeingEdited,
                collapseAll: isAnyOpen && !isBeingEdited,
                done: isBeingEdited,
                delete: isBeingEdited,
            })
        );

        return {
            selectWordGridStateVM,
            selectGroupActionPanelVM,

            selectGroupsAndWords,
            selectIsWordUnfolded,
            selectIsEditingCurrentGroup,
            selectIsRenamingCurrentGroup,

        }
    },

});





export const {
    name,
    reducer,
    selectWordGridStateVM,
    selectGroupActionPanelVM,

    selectGroupsAndWords,
    selectIsWordUnfolded,
    selectIsEditingCurrentGroup,
    selectIsRenamingCurrentGroup,
    selectNewGroupMode,
} = glossaryFeature;