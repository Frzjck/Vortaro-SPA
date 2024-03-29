import firebase from "firebase/compat/app";
import { FormWord } from "../glossary/components/word-grid/components/word-form/models";
import { FireWordCreateRequest, FireWordUpdateRequest } from "@app/models/backend/word";
import { Word } from "../store/words-list/words.models";

// --------------------- Creation
export const formWordToNewFireWord = (word: FormWord): FireWordCreateRequest => {
    const additionalTranslations = _formatFormAdditionalTranslations(word.additionalTranslations);
    return {
        ...word,
        additionalTranslations,
        created: firebase.firestore.FieldValue.serverTimestamp(),
    };
};

export const formWordToNewWord = (word: FormWord, id: string): Word => {
    const additionalTranslations = _formatFormAdditionalTranslations(word.additionalTranslations);
    return {
        ...word,
        id,
        additionalTranslations,
        proficiency: 10
    }
};

// --------------------- Updates
export const formWordToUpdatedWord = (word: FormWord): Partial<Word> => {
    const additionalTranslations = _formatFormAdditionalTranslations(word.additionalTranslations);
    return {
        ...word,
        additionalTranslations,
    };
};

export const formWordToUpdatedFireWord = (word: FormWord): FireWordUpdateRequest => {
    const additionalTranslations = _formatFormAdditionalTranslations(word.additionalTranslations);
    return {
        ...word,
        additionalTranslations,
        updated: firebase.firestore.FieldValue.serverTimestamp()
    };
};


const _formatFormAdditionalTranslations = (additionalTranslations) => additionalTranslations.filter(item => item.translation).map((item) => item.translation);