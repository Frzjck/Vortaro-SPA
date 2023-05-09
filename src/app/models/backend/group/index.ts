import firebase from "firebase/compat/app";

export interface FireGroup {
    name: string;
    averageProficiency: number;
    shared_with?: string[];
    wordIds: string[];

    created: firebase.firestore.FieldValue;
    updated?: firebase.firestore.FieldValue;
}