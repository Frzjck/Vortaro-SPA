import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { convertSnaps } from '../../../shared/utils/db-utils';


import { Word } from '@app/pages/classroom/store/words-list';
import { from } from 'rxjs';
import { FireWordCreateRequest } from '@app/models/backend/word';

@Injectable({
  providedIn: 'root',
})
export class WordService {

  exerciseMode: string;

  constructor(private db: AngularFirestore) { }

  getWordsFromServer(userId) {
    console.log("------>>>>> getWordsFromServer ", userId)
    const userRef = this.db.collection("users").doc(userId).ref;
    // Purpose of next line is to extract all collections named "word" located inside a certain user. We order by __name__ (internal fire id, alternatively firebase.firestore.FieldPath.documentId()), as far as I understand because user has no other fields (must be a different reason since substitution with __createTime__ throws an error).
    // https://stackoverflow.com/questions/68049541/collectiongroupquery-but-limit-search-to-subcollections-under-a-particular-docum/68049847#68049847
    return this.db.collectionGroup('words', (ref) => ref.orderBy("__name__").startAt(userRef.path).endAt(userRef.path + "\uf8ff")).get().pipe(map((results) => convertSnaps<Word>(results)));
  }

  addWordRequest(word: FireWordCreateRequest, groupId: string, userId: string) {
    return from(this.db.collection(`/users/${userId}/groups/${groupId}/words`).add(word))
  }
}