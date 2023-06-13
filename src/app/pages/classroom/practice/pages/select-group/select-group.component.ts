import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { selectGroups } from '@classroom/store/groups-list/groups.selectors';
import { Word } from '@classroom/store/words-list/words.models';
import { Group } from '@classroom/store/groups-list/groups.models';
import { selectWordsByIds } from '@classroom/store/words-list/words.selectors';

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

    this.groupsAndWordsObs$ = this.store.select(selectGroups)
      .pipe(
        map((groups: Group[]) => {
          return groups.map((group) => {
            return {
              group,
              words$: this.store.select(selectWordsByIds(group.wordIds))
            }
          })
        })
      )
  }

}
