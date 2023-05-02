import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Group, getGroups } from '@app/pages/classroom/store/groups-list';
import { Observable, map } from 'rxjs';
import { Word, getWordsByGroupId } from '@app/pages/classroom/store/words-list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-select-group',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectGroupComponent {
  groupsAndWordsObs$: Observable<{ group: Group, words$: Observable<Word[]> }[]>;
  constructor(private store: Store) {

    this.groupsAndWordsObs$ = this.store.select(getGroups)
      .pipe(
        map((groups: Group[]) => {
          return groups.map((group) => {
            return {
              group,
              words$: this.store.select(getWordsByGroupId(group.id))
            }
          })
        })
      )
  }

}
