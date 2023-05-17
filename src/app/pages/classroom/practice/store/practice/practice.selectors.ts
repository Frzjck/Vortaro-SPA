import { createSelector } from "@ngrx/store";
import { selectCurrentWord, selectAnswerInput, selectIsActionNext, selectIsActionProofread, selectIsLastAnswerCorrect, selectProgress, selectAnswerLocked, selectTestingAgainst, selectExerciseWords, selectAnswerChoices } from "./practice.reducer";
import { _getAnswers, _isResponseCorrect } from "./store-utils";



export const selectCorrectAnswers = createSelector(
    selectCurrentWord,
    selectTestingAgainst,
    (currentWord, testingAgainst) => {
        return _getAnswers([currentWord], testingAgainst);
    }
);

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
    selectExerciseWords,
    selectTestingAgainst,
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





