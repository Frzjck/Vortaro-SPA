import * as firestore from "@google-cloud/firestore";

export interface FireGroup {
    name: string;
    averageProficiency: number;
    shared_with?: string[];

    created: firestore.FieldValue;
    updated?: firestore.FieldValue;
}