import { Injectable } from '@angular/core';
import { Group } from '../models/group-model';
import { from, Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { convertSnaps } from "./db-utils";

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private db: AngularFirestore
  ) { }


  createGroup(newGroup: Partial<Group>, groupId?: string) {
    groupId = undefined;
    return this.db
      .collection("courses", (ref) => ref.orderBy("seqNo", "desc").limit(1))
      .get()
      .pipe(
        concatMap((result) => {
          const groups = convertSnaps<Group>(result);
          const lastSeqNo = groups[0]?.seqNo ?? 0;
          const group = {
            ...newGroup,
            seqNo: lastSeqNo + 1,
          };
          let save$: Observable<any>;

          if (groupId)
            save$ = from(this.db.doc(`groups/${groupId}`).set(group));
          else save$ = from(this.db.collection("groups").add(group));
          return save$.pipe(
            map((res) => {
              return {
                id: groupId ?? res.id,
                ...group,
              };
            })
          );
        })
      );
  }

  updateGroup(groupId: string, changes: Partial<Group>): Observable<any> {
    return from(this.db.doc(`groups/${groupId}`).update(changes));
  }

  loadGroups(): Observable<Group[]> {
    return this.db
      .collection("groups", (ref) => {
        return ref.orderBy("seqNo")
      }
      )
      .get()
      .pipe(map((results) => convertSnaps<Group>(results)));
  }

  deleteGroup(groupId: string) {
    return from(this.db.doc(`groups/${groupId}`).delete());
  }



}
