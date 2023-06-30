import { FieldValue } from '@angular/fire/firestore';

export interface FireGroup {
    name: string;
    averageProficiency: number;
    shared_with?: string[];
    wordIds: string[];
}



export interface FireGroupCreateRequest extends Omit<FireGroup, "averageProficiency"> {
    created: FieldValue;
}
export interface FireGroupUpdateRequest extends Omit<FireGroup, "averageProficiency" | "wordIds"> {
    updated: FieldValue;
}
