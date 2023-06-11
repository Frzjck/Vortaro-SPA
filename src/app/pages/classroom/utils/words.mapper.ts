import firebase from "firebase/compat/app";
import { Word } from "../store/words-list";
import { FormWord } from "../glossary/components/word-grid/components/word-form/models";
import { FireWordCreateRequest, FireWordUpdateRequest } from "@app/models/backend/word";


export const formWordToNewFireWord = (word: FormWord): FireWordCreateRequest => {
    const additionalTranslations = word.additionalTranslations.map((item) => item.translation);
    return {
        ...word,
        additionalTranslations,
        created: firebase.firestore.FieldValue.serverTimestamp(),
    };
};

export const formWordToUpdateWord = (word: FormWord): FireWordUpdateRequest => {
    const additionalTranslations = word.additionalTranslations.map((item) => item.translation);
    return {
        ...word,
        additionalTranslations,
        updated: firebase.firestore.FieldValue.serverTimestamp(),
    };
};

export const formWordToNewWord = (word: FormWord, id: string): Word => {
    const additionalTranslations = word.additionalTranslations.map((item) => item.translation);
    return {
        ...word,
        id,
        additionalTranslations,
        proficiency: 10
    }
};
