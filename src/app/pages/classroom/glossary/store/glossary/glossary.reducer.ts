import { createFeature, createReducer, on } from "@ngrx/store";
import { UnknownPageGlossaryAction } from "./glossary.actions";

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

    // extraSelectors: ({ selectRandomSeed, selectActiveWordIndex, selectExerciseWords, selectWordsCompleted, selectAnswerLocked }) => ({
    //     selectCurrentGroupExerciseWords: createSelector(
    //         getParams,
    //         selectGroupEntities,
    //         selectWordEntities,
    //         (params, groupEntities, wordEntities) => {
    //             let wordIds = groupEntities[params.groupId].wordIds;
    //             return wordIds.map(wordId => wordEntities[wordId])
    //         }
    //     ),

    //     getWorstWords: createSelector(
    //         selectWords,
    //         (words) => words
    //             .sort((a, b) => (a.proficiency > b.proficiency ? 1 : -1))
    //             .slice(0, 15)
    //     ),

    //     getRandomWords: (_) => createSelector(
    //         selectWords,
    //         selectRandomSeed,
    //         (words) => {
    //             return shuffle(words).slice(0, 15)
    //         }
    //     ),
    // }),

});





// export const {
//     name,
//     reducer,
//     selectAnswerInput,
//     selectExercisesState,
//     selectCurrentTestingAgainst,
//     selectCurrentExerciseMode,
//     selectAnswerChoices,
//     selectWordsCompleted,
//     selectExerciseStatus,
//     selectRandomSeed,
//     selectExerciseWords,
//     selectActiveWordIndex,
//     selectIsLastAnswerCorrect,
//     selectAnswerLocked,
//     selectResultScores,
//     getRandomWords,
//     getWorstWords,
//     selectCurrentGroupExerciseWords,
//     selectCurrentWord,
//     selectProgress,
//     selectIsActionNext,
//     selectIsActionProofread,
// } = exercisesFeature;