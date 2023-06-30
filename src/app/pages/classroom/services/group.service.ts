import { Injectable, inject } from '@angular/core';
import { Firestore, collection, deleteDoc, updateDoc, addDoc, doc, collectionChanges } from '@angular/fire/firestore';


import { from } from 'rxjs';
import { FireGroupCreateRequest, FireGroupUpdateRequest } from '@app/models/backend/group';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    firestore = inject(Firestore);

    getGroupsRequest(uid) {
        const collectionRef = collection(this.firestore, `/users/${uid}/groups`);
        return collectionChanges(collectionRef)
    }

    addGroupRequest(group: FireGroupCreateRequest, userId: string) {
        const collectionRef = collection(this.firestore, `/users/${userId}/groups`);
        return from(addDoc(collectionRef, group));
    }

    updateGroupRequest(group: FireGroupUpdateRequest, userId: string, groupId: string) {
        const docRef = doc(this.firestore, `/users/${userId}/groups/${groupId}`);
        return from(updateDoc(docRef, { group }));
    }

    deleteGroupRequest(userId: string, groupId: string) {
        const docRef = doc(this.firestore, `/users/${userId}/groups/${groupId}`);
        return from(deleteDoc(docRef));
    }
}