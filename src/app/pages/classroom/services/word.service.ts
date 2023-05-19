import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { convertSnaps } from '../../../shared/utils/db-utils';


import { Word } from '@app/pages/classroom/store/words-list';

@Injectable({
  providedIn: 'root',
})
export class WordService {

  exerciseMode: string;

  constructor(private db: AngularFirestore) { }
  getWordsFromServer() {
    const userRef = this.db.collection("users").doc("gTsSvxlF4Cfd0hvxhmT0Y8yAQHXU").ref;
    // Purpose of next line is to extract all collections named "word" located inside a certain user. We order by __name__ (internal fire id, alternatively firebase.firestore.FieldPath.documentId()), as far as I understand because user has no other fields (must be a different reason since substitution with __createTime__ throws an error).
    return this.db.collectionGroup('words', (ref) => ref.orderBy("__name__").startAt(userRef.path).endAt(userRef.path + "\uf8ff")).get().pipe(map((results) => convertSnaps<Word>(results)));
  }
}
