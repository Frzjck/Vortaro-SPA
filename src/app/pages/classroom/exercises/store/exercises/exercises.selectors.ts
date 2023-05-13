import { createSelector } from "@ngrx/store";
import { TestingAgainstType, getCurrentWord, selectAnswerInput, selectTestingAgainst } from "./exercises.reducer";







export const selectIsResponseCorrect = createSelector(
    getCurrentWord,
    selectAnswerInput,
    selectTestingAgainst,
    (currentWord, answer, testingAgainst) => {
        return _isResponseCorrect(currentWord, answer, testingAgainst);
    }
);






const _isResponseCorrect = (word, answer, testingAgainst) => {
    if (testingAgainst === TestingAgainstType.TRANSLATION) {
        const possibleAnswers = [word.translation.toLowerCase()]
        if (word.additionalTr?.length) possibleAnswers.push(...word.additionalTr.map((x) => x.toLocaleLowerCase()))
        return possibleAnswers.includes(answer.toLowerCase());
    }
    else if (testingAgainst === TestingAgainstType.ORIGINAL) return word.original.toLowerCase() === answer.toLowerCase();
}