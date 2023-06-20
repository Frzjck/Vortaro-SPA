import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Score } from '@app/models/backend/word';

@Component({
  selector: 'app-rating-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-ui.component.html',
  styleUrls: ['./rating-ui.component.scss'],
})
export class RatingUIComponent implements OnInit {
  @Input() uiType: 'stars' | 'bars';
  @Input() score: Score;
  constructor() { }

  ngOnInit(): void { }

  decorator(barN) {
    const good = 'rgb(0, 194, 0)';
    const ok = 'rgb(255, 187, 0)';
    const bad = 'red';
    if (barN === 1) {
      const color = this.score > 16 ? good : this.score > 8 ? ok : bad;
      return color;
    } else if (barN === 2) {
      const color =
        this.score > 16
          ? good
          : this.score > 8
            ? ok
            : this.score > 4
              ? bad
              : 'none';
      return color;
    } else if (barN === 3) {
      const color = this.score > 16 ? good : this.score > 8 ? ok : 'none';
      return color;
    } else if (barN === 4) {
      const color = this.score > 16 ? good : this.score > 12 ? ok : 'none';
      return color;
    } else if (barN === 5) {
      const color = this.score > 16 ? good : 'none';
      return color;
    }
  }
}
