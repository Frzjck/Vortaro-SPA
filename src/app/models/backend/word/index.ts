import * as firestore from "@google-cloud/firestore";


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
    name: string;
    translation: string;
    proficiency: Score;
    tips?: string;
    additionalTr?: string[];

    created: firestore.FieldValue;
    updated?: firestore.FieldValue;
}
