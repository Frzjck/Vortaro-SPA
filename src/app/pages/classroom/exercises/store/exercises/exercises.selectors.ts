import { createSelector } from "@ngrx/store";
import { TestingAgainstType, selectCurrentWord, selectAnswerInput, selectIsActionNext, selectIsActionProofread, selectIsLastAnswerCorrect, selectProgress, selectSubmitButtonAction, selectTestingAgainst } from "./exercises.reducer";







export const selectIsResponseCorrect = createSelector(
    selectCurrentWord,
    selectAnswerInput,
    selectTestingAgainst,
    (currentWord, answer, testingAgainst) => {
        return _isResponseCorrect(currentWord, answer, testingAgainst);
    }
);

export const selectSpellingViewModel = createSelector(
    selectCurrentWord,
    selectTestingAgainst,
    selectIsLastAnswerCorrect,
    selectProgress,
    selectAnswerInput,
    selectIsActionNext,
    selectIsActionProofread,
    (
        currentWord,
        testingAgainst,
        isLastAnswerCorrect,
        progress,
        answerInput,
        isActionNext,
        isActionProofread,
    ) => ({
        currentWord,
        testingAgainst,
        isLastAnswerCorrect,
        progress,
        answerInput,
        isActionNext,
        isActionProofread,
    })
);
export const selectQuizViewModel = createSelector(
    selectCurrentWord,
    selectTestingAgainst,
    selectIsLastAnswerCorrect,
    selectProgress,
    selectAnswerInput,
    selectAnswerLocked,
    selectIsActionProofread,
    (
        currentWord,
        testingAgainst,
        isLastAnswerCorrect,
        progress,
        answerInput,
        isAnswerLocked,
        isActionProofread,
    ) => ({
        currentWord,
        testingAgainst,
        isLastAnswerCorrect,
        progress,
        answerInput,
        isAnswerLocked,
        isActionProofread,
    })
);





const _isResponseCorrect = (word, answer, testingAgainst) => {
    if (testingAgainst === TestingAgainstType.TRANSLATION) {
        const possibleAnswers = [word.translation.toLowerCase()]
        if (word.additionalTr?.length) possibleAnswers.push(...word.additionalTr.map((x) => x.toLocaleLowerCase()))
        return possibleAnswers.includes(answer.toLowerCase());
    }
    else if (testingAgainst === TestingAgainstType.ORIGINAL) return word.original.toLowerCase() === answer.toLowerCase();
}