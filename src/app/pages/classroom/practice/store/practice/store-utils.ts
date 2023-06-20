import { Word } from "@classroom/store/words-list/words.models";
import { shuffle } from "../../pages/exercises/utils/shuffleArray";
import { TestingAgainstType } from "@app/store/app/app.reducer";



export const _generateAnswerChoices = (currentWord: Word, currentWordSet: Word[], testingAgainst: TestingAgainstType): Array<string> => {

    //remove currentWord from word set
    const wrongWords = currentWordSet.filter(x => x.id !== currentWord.id);
    const wrongAnswers = _getAnswers(wrongWords, testingAgainst);
    const correctAnswers = _getAnswers([currentWord], testingAgainst);

    // get 3 random answers from word set
    const wrongAnswersShuffled = shuffle(wrongAnswers);
    const wrongAnswersSlice = wrongAnswersShuffled.slice(0, 3);

    const correctAnswersShuffled = shuffle(correctAnswers);
    const correctAnswersSlice = correctAnswersShuffled.slice(0, 1);


    const presentedAnswers = [...wrongAnswersSlice, ...correctAnswersSlice];
    const shuffledPossibleAnswers = shuffle(presentedAnswers);
    return shuffledPossibleAnswers;
}


export const _getAnswers = (words: Word[], testingAgainst: TestingAgainstType): string[] => {
    if (!words[0]) return [];
    if (testingAgainst === TestingAgainstType.ORIGINAL) {
        return words.map(word => word.original);
    }
    if (testingAgainst === TestingAgainstType.TRANSLATION) {
        return words.map(word => {
            if (word?.additionalTranslations?.length) return [word.translation, ...word?.additionalTranslations]
            return [word.translation]

        }).flat();
    }
}


export const _isResponseCorrect = (word: Word, answer: string, testingAgainst: TestingAgainstType): boolean => {
    if (testingAgainst === TestingAgainstType.TRANSLATION) {
        const possibleAnswers = [word.translation.toLowerCase()]
        if (word.additionalTranslations?.length) possibleAnswers.push(...word.additionalTranslations.map((x) => x.toLocaleLowerCase()))
        return possibleAnswers.includes(answer.toLowerCase());
    }
    else if (testingAgainst === TestingAgainstType.ORIGINAL) return word.original.toLowerCase() === answer.toLowerCase();
}