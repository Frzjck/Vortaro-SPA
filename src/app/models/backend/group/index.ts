import firebase from "firebase/compat/app";

export interface FireGroup {
    name: string;
    averageProficiency: number;
    shared_with?: string[];
    wordIds: string[];
}



export interface FireGroupCreateRequest extends Omit<FireGroup, "averageProficiency"> {
    created: firebase.firestore.FieldValue;
}
export interface FireGroupUpdateRequest extends Omit<FireGroup, "averageProficiency"> {
    updated: firebase.firestore.FieldValue;
}
