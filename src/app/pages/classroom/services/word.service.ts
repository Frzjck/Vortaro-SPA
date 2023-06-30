import { Injectable, inject } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { convertSnaps } from '../../../shared/utils/db-utils';
import { Firestore, collection, deleteDoc, updateDoc, addDoc, doc, collectionGroup, query, orderBy, startAt, endAt, getDocs } from '@angular/fire/firestore';

import { from } from 'rxjs';
import { FireWordCreateRequest, FireWordUpdateRequest } from '@app/models/backend/word';
import { Word } from '../store/words-list/words.models';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  firestore = inject(Firestore);


  getWordsFromServer(userId) {
    const userRef = doc(this.firestore, `/users/${userId}`);

    // Purpose of next line is to extract all collections named "word" located inside a certain user. We order by __name__ (internal fire id, alternatively firebase.firestore.FieldPath.documentId()), as far as I understand because user has no other fields (must be a different reason since substitution with __createTime__ throws an error).
    // https://stackoverflow.com/questions/68049541/collectiongroupquery-but-limit-search-to-subcollections-under-a-particular-docum/68049847#68049847
    const wordsCollectionGroup = collectionGroup(this.firestore, 'words');

    const queryRef = query(
      wordsCollectionGroup,
      orderBy('__name__'),
      startAt(userRef.path),
      endAt(userRef.path + '\uf8ff')
    );

    return from(getDocs(queryRef)).pipe(
      tap((res) => console.log("▄▄▄ ▄ ▄▄▄", res)),
      map(
        (res) => res.docs.map((doc) => doc.data()) as Word[])
    );

    // return this.db.collectionGroup('words', (ref) => ref.orderBy("__name__").startAt(userRef.path).endAt(userRef.path + "\uf8ff")).get().pipe(map((results) => convertSnaps<Word>(results)));
  }

  addWordRequest(word: FireWordCreateRequest, userId: string, groupId: string) {
    const collectionRef = collection(this.firestore, `/users/${userId}/groups/${groupId}/words`);
    return from(addDoc(collectionRef, word));
  }

  updateWordRequest(word: FireWordUpdateRequest, userId: string, groupId: string, wordId: string) {
    const docRef = doc(this.firestore, `/users/${userId}/groups/${groupId}/words/${wordId}`);
    return from(updateDoc(docRef, { word }));
  }

  deleteWordRequest(userId: string, groupId: string, wordId: string) {
    const docRef = doc(this.firestore, `/users/${userId}/groups/${groupId}/words/${wordId}`);
    return from(deleteDoc(docRef));
  }
}