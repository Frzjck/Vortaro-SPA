import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { selectThereAreWords } from '../store/words-list/words.selectors';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './practice-menu.component.html',
  styleUrls: ['./practice-menu.component.scss'],
})
export class ExerciseMenuComponent {
  thereAreWords = this.store.select(selectThereAreWords);

  constructor(
    private store: Store,
  ) { }
}
