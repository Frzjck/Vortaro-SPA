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
        on(GlossaryGroupPanelAction.foldAdditionalTranslationsGroup, (state) => ({
            ...state,
            unfoldedWords: initialState.unfoldedWords,
        })),

        on(GlossaryWordUIAction.foldAdditionalTranslationsWord, (state, { wordId }) => ({
            ...state,
            unfoldedWords: state.unfoldedWords.filter((id) => id !== wordId),
        })),

        on(GlossaryGroupPanelAction.unfoldAdditionalTranslationsWords, (state, { wordIds }) => ({
            ...state,
            unfoldedWords: wordIds,
        })),

        on(GlossaryWordUIAction.unfoldAdditionalTranslationsWord, (state, { wordId }) => ({
            ...state,
            unfoldedWords: state.unfoldedWords.concat(wordId),
        })),

        on(GlossaryGroupPanelAction.toggleEditGroup, (state, { groupId }) => ({
            ...initialState,
            editingGroupId: state.editingGroupId === groupId ? null : groupId,
        })),

        on(GlossaryWordUIAction.editWord, (state, { wordId }) => ({
            ...state,
            editingWordId: wordId,
        })),

        on(WordFormAction.cancelEditWord, WordAPIResponseAction.updateWordSuccess, (state) => ({
            ...state,
            editingWordId: initialState.editingWordId,
        })),

        on(GlossaryWordGridAction.activateNewWordMode, (state) => ({
            ...state,
            addNewWordMode: true,
        })),

        on(WordFormAction.cancelNewWordMode, WordAPIResponseAction.createWordSuccess, (state) => ({
            ...state,
            addNewWordMode: false,
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

        const selectIsEditingCurrentGroup = (groupId) => createSelector(
            selectEditingGroupId,
            (editingGroupId) => editingGroupId === groupId
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
            selectAddNewWordMode,
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


} = glossaryFeature;