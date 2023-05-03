import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { from, Observable, ReplaySubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { convertSnaps } from '../../../shared/utils/db-utils';


import firebase from "firebase/compat/app";
import { UserService } from '../../login/user.service';
import OrderByDirection = firebase.firestore.OrderByDirection;
import { Word } from '@app/pages/classroom/store/words-list';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class WordService {

  exerciseMode: string;

  constructor(private db: AngularFirestore, private userService: UserService) { }

  deleteWord(groupId: string, wordId: string)
    : Observable<any> {
    return from(this.db.doc(`users/${this.userService.user.uid}/groups/${groupId}/words/${wordId}`).delete());
  }

  getGroupWords(
    groupId: string,
    sortOrder: OrderByDirection = "asc",
  ): Observable<Word[]> {
    return this.db
      .collection(`users/${this.userService.user.uid}/groups/${groupId}/words`, (ref) =>
        ref
          .orderBy("date", sortOrder)
      )
      .get()
      .pipe(map((results) => convertSnaps<Word>(results)));
  }

  getWordsFromServer() {
    const userRef = this.db.collection("users").doc("gTsSvxlF4Cfd0hvxhmT0Y8yAQHXU").ref;
    // Purpose of next line is to extract all collections named "word" located inside a certain user. We order by __name__ (internal fire id, alternatively firebase.firestore.FieldPath.documentId()), as far as I understand because user has no other fields (must be a different reason since substitution with __createTime__ throws an error).
    return this.db.collectionGroup('words', (ref) => ref.orderBy("__name__").startAt(userRef.path).endAt(userRef.path + "\uf8ff")).get().pipe(map((results) => convertSnaps<Word>(results)));
  }

  createWord(newWord: Partial<Word>, groupId: string, wordId?: string): Observable<Partial<Word>> {
    newWord = {
      ...newWord,
      created: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp,
    };

    let save$: Observable<any>;
    if (wordId)
      save$ = from(this.db.doc(`users/${this.userService.user.uid}/groups/${groupId}/words/${wordId}`).set(newWord));
    else save$ = from(this.db.collection(`users/${this.userService.user.uid}/groups/${groupId}/words/`).add(newWord));

    return save$.pipe(
      map((res) => {
        return {
          id: wordId ?? res.id,
          ...newWord,
        };
      })
    );
  }

  updateWord(wordId: string, groupsId: string, changes: Partial<Word>): Observable<any> {
    return from(this.db.doc(`users/${this.userService.user.uid}/groups/${groupsId}/words/${wordId}`).update(changes));
  }

  // // Returning different word sets depending on the exercise type selected
  // // ['translate-exercise', 'random', 'work-on-mistakes'];
  // getRightWords(typeParam: string, groupIdParam: string) {
  //   // Depending on Type we feed different word arrays
  //   if (typeParam === 'word-group') {
  //     const words = this.words.filter((word) => word.parentId === groupIdParam);
  //     return this.shuffle(words);
  //   } else if (typeParam === 'random') {
  //     // Return random 5 words to exercises
  //     const words = this.shuffle(this.words).slice(0, 15);
  //     return this.shuffle(words);
  //   } else if (typeParam === 'work-on-mistakes') {
  //     //Sort array and get 5 worst
  //     const words = this.words
  //       .sort((a, b) => (a.proficiency > b.proficiency ? 1 : -1))
  //       .slice(0, 15);
  //     return this.shuffle(words);
  //   }
  // }





  // Shuffle array and return a reordered one
  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
}
