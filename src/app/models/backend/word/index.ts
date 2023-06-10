import firebase from "firebase/compat/app";


export type Score =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20;

export interface FireWord {
    original: string;
    translation: string;
    proficiency: Score;
    tips?: string;
    additionalTranslations?: string[];
}
export interface FireWordCreateRequest extends Omit<FireWord, "proficiency"> {
    created: firebase.firestore.FieldValue;
}
export interface FireWordUpdateRequest extends Omit<FireWord, "proficiency"> {
    updated: firebase.firestore.FieldValue;
}
