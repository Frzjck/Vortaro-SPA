import { Injectable } from '@angular/core';
import { Group } from '../models/group-model';
import { WordManageService } from './word-manage.service';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  BACKEND_URL = environment.apiUrl + '/groups';
  // GET to get all groups, POST to create a group
  groupNum = '';
  // GET to get, PUT to edit, DELETE to delete a single group
  getGroupUrl = '/groups/' + this.groupNum;

  constructor(
    private wordService: WordManageService,
    private http: HttpClient
  ) {}

  private groupsObs = new ReplaySubject<Group[]>(1);
  private groups: Group[];

  getGroupsFromServer() {
    return this.http
      .get<{ message: string; data: any }>(this.BACKEND_URL)
      .pipe(
        map((res: { message: string; data: any }) => {
          return res.data.map((group): Group => {
            return {
              groupNum: group._id,
              name: group.title,
              averageProficiency: group.averageProficiency,
            };
          });
        })
      )
      .subscribe((transformedPostData) => {
        this.groups = transformedPostData;
        this.groupsObs.next([...this.groups]);
      });
  }

  groupsObsListener() {
    return this.groupsObs.asObservable();
  }

  getAllGroups() {
    return [...this.groups];
  }
  // Return single group, LATER ON SHOULD BE CHANGED TO ID SEARCH
  //delete???? TODO
  getGroup(name: string) {
    const group: Group = this.groups.find((group) => {
      return group.name === name;
    });
    return group;
  }

  editOrCreate(newName, groupNum?) {
    if (groupNum) {
      return this.http.put(this.BACKEND_URL + '/' + groupNum, {
        title: newName,
      });
    } else {
      return this.http.post(this.BACKEND_URL, {
        title: newName,
      });
    }
  }
  deteleGroup(groupId) {
    return this.http.delete(this.BACKEND_URL + '/' + groupId);
  }
}
