import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


import { from } from 'rxjs';
import { FireGroupCreateRequest, FireGroupUpdateRequest } from '@app/models/backend/group';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    constructor(private db: AngularFirestore) { }

    addGroupRequest(group: FireGroupCreateRequest, userId: string) {
        return from(this.db.collection(`/users/${userId}/groups`).add(group))
    }

    updateGroupRequest(group: FireGroupUpdateRequest, userId: string, groupId: string) {
        return from(this.db.collection(`/users/${userId}/groups`).doc(groupId).set(group))
    }

    deleteGroupRequest(userId: string, groupId: string) {
        return from(this.db.collection(`/users/${userId}/groups`).doc(groupId).delete())
    }
}