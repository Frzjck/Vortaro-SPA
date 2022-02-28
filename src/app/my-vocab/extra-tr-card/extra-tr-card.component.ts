import { Component, Input, OnInit } from '@angular/core';
import { Word } from '../../models/word-model';

@Component({
  selector: 'app-extra-tr-card',
  templateUrl: './extra-tr-card.component.html',
  styleUrls: ['./extra-tr-card.component.scss'],
})
export class ExtraTrCardComponent implements OnInit {
  constructor() {}
  translationArr = [
    { tr: 'Translation 1' },
    { tr: 'Short 2' },
    { tr: 'Translation 3' },
    { tr: 'Long Translation 4' },
    { tr: 'Long Translation 5' },
    { tr: 'Translation 6' },
    { tr: 'Translation 7' },
  ];
  @Input() word: Word;
  ngOnInit(): void {}
}
