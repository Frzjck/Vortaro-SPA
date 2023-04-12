import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Word } from '@app/models/backend/word';

@Component({
  selector: 'app-extra-tr-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
  <mat-card class="extra-tr-card">
    <span class="translation" *ngFor="let translation of word.additionalTr">
      {{ translation }}
    </span>
  </mat-card>
  `,
  styles: [`.extra-tr-card {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: center;
  
    border-right: 1px solid var(--border-tips);
    border-left: 1px solid var(--border-tips);
    border-bottom: 1px solid var(--border-tips);
    border-radius: 0 0 5px 5px;
    max-width: 90%;
    margin: auto;
    box-shadow: var(--tr-shadow-sm);
  
    color: var(--text-primary);
    text-shadow: var(--text-sh);
    background-color: var(--bg-extra-translations);
    gap: 5px;
  
  
    .translation {
      border: var(--bar-border) 1px solid;
      border-radius: 3px;
      padding: 0 5px;
    }
  }
  `],
})
export class ExtraTrCardComponent {
  constructor() { }
  @Input() word: Word;
}
