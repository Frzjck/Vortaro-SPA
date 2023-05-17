import { createSelector } from "@ngrx/store";
import { selectCurrentWord, selectAnswerInput, selectIsActionNext, selectIsActionProofread, selectIsLastAnswerCorrect, selectProgress, selectAnswerLocked, selectCurrentTestingAgainst, selectExerciseWords, selectAnswerChoices } from "./practice.reducer";
import { _getAnswers, _isResponseCorrect } from "./store-utils";



export const selectCorrectAnswers = createSelector(
    selectCurrentWord,
    selectCurrentTestingAgainst,
    (currentWord, currentTestingAgainst) => {
        return _getAnswers([currentWord], currentTestingAgainst);
    }
);

export const selectIsResponseCorrect = createSelector(
    selectCurrentWord,
    selectAnswerInput,
    selectCurrentTestingAgainst,
    (currentWord, answer, currentTestingAgainst) => {
        return _isResponseCorrect(currentWord, answer, currentTestingAgainst);
    }
);


export const selectSpellingViewModel = createSelector(
    selectCurrentWord,
    selectCurrentTestingAgainst,
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
    selectExerciseWords,
    selectCurrentTestingAgainst,
    selectIsLastAnswerCorrect,
    selectProgress,
    selectAnswerInput,
    selectAnswerLocked,
    selectAnswerChoices,
    selectCorrectAnswers,
    (
        currentWord,
        exerciseWords,
        testingAgainst,
        isLastAnswerCorrect,
        progress,
        answerInput,
        isAnswerLocked,
        answerChoices,
        correctAnswers,
    ) => ({
        currentWord,
        exerciseWords,
        testingAgainst,
        isLastAnswerCorrect,
        progress,
        selectedAnswer: answerInput,
        isAnswerLocked,
        answerChoices,
        correctAnswers,
    })
);





