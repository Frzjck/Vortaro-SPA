import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { convertSnaps } from '../shared/utils/db-utils';

import { UserService } from '../pages/login/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { QuerySnapshot, DocumentChange } from '@firebase/firestore-types';
import { Word } from '@app/store/words';
import { Group } from '@app/store/groups';

@Injectable({
  providedIn: 'root',
})
export class GroupService {


  constructor(
    private db: AngularFirestore, private userService: UserService, private afAuth: AngularFireAuth
  ) { }


  createGroup(newGroup: Partial<Group>, groupId?: string): Observable<Partial<Group>> {
    let save$: Observable<any>;
    if (groupId)
      save$ = from(this.db.doc(`users/${this.userService.user.uid}/groups/${groupId}`).set(newGroup));
    else save$ = from(this.db.collection(`users/${this.userService.user.uid}/groups/`).add(newGroup));

    return save$.pipe(
      map((res) => {
        return {
          id: groupId ?? res.id,
          ...newGroup,
        };
      })
    );
  }

  updateGroup(groupId: string, changes: Partial<Group>): Observable<any> {
    return from(this.db.doc(`groups/${groupId}`).update(changes));
  }

  loadGroups(): Observable<Group[] | any> {
    // return of(["test"]);
    return this.db
      .collection(`users/${this.userService.user.uid}/groups`)
      .get()
      .pipe(map((results) => convertSnaps<Group>(results)));
  }

  async uglyButton() {

    let userId = (await this.afAuth.currentUser).uid;
    // let uid = user;
    // throw new Error('Method not implemented.');
    // console.log(this.db.collection(`/users/${userId}/groups`).snapshotChanges().subscribe(snaps => {
    //   console.log(snaps)
    // }));
    // await this.loadGroups().subscribe((res) => console.log("RES", res))
    let test = await (this.loadGroups() as Observable<QuerySnapshot>);
  }
  // let user = this.afAuth.auth.currentUser;
  // uid = user.uid;

  loadGroupsAndWords(): Observable<Group[]> {
    return this.db.collection<Group>(`users/${this.userService.user.uid}/groups`).snapshotChanges()
      .pipe(
        map((groups) => {
          return groups.map((group) => {
            const data = group.payload.doc.data();
            const id = group.payload.doc.id;
            const wordsRef = this.db.collection<Group>(`users/${this.userService.user.uid}/groups`).doc(id).collection<Word>('words');
            const words$ = wordsRef.snapshotChanges().pipe(
              map((words) =>
                words.map((word) => {
                  const wordData = word.payload.doc.data();
                  const wordId = word.payload.doc.id;
                  return { id: wordId, ...wordData };
                })
              )
            );
            return { id, ...data, words: words$ };
          });
        })
      );
  }

  deleteGroup(groupId: string) {
    return from(this.db.doc(`users/${this.userService.user.uid}/groups/${groupId}`).delete());
  }


  deleteGroupAndWords(groupId: string)
    : Observable<any> {
    return this.db
      .collection(`users/${this.userService.user.uid}/groups/${groupId}/words`)
      .get()
      .pipe(
        concatMap((results) => {
          const words = convertSnaps<Word>(results);
          const batch = this.db.firestore.batch();
          const groupRef = this.db.doc(`groups/${groupId}`).ref;
          batch.delete(groupRef);
          for (let word of words) {
            const wordRef = this.db.doc(
              `users/${this.userService.user.uid}/groups/${groupId}/words/${word.id}`
            ).ref;
            batch.delete(wordRef);
          }
          return from(batch.commit());
        })
      );
  }

}
