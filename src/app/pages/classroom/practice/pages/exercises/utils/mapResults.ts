import { Word } from "@app/pages/classroom/store/words-list/words.models";







export const mapResultsForServer = (wordSet: Word[], results: boolean[]) => {
    let formattedResults = {};
    for (let i = 0; i < wordSet.length; i++) formattedResults[wordSet[i].id] = results[i]
    return formattedResults;
}