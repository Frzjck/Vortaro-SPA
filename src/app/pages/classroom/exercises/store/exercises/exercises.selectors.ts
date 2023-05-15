import { createSelector } from "@ngrx/store";
import { TestingAgainstType, selectCurrentWord, selectAnswerInput, selectIsActionNext, selectIsActionProofread, selectIsLastAnswerCorrect, selectProgress, selectAnswerLocked, selectTestingAgainst, selectExerciseWords } from "./exercises.reducer";
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
    (
        currentWord,
        exerciseWords,
        testingAgainst,
        isLastAnswerCorrect,
        progress,
        answerInput,
        isAnswerLocked,
    ) => ({
        currentWord,
        exerciseWords,
        testingAgainst,
        isLastAnswerCorrect,
        progress,
        selectedAnswer: answerInput,
        isAnswerLocked,
    })
);





