import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingUIComponent } from '@app/pages/glossary/shared';
import { Word } from '@app/models/backend/word';

@Component({
  selector: 'app-word-ui',
  standalone: true,
  imports: [CommonModule, RatingUIComponent],
  template: `
  <div class="ui-wrap">
    <i
      *ngIf="eye"
      class="far fa-eye"
      (click)="_iconPressed('toggleTranslations')"
    ></i>
    <i
      *ngIf="eyeSlash"
      class="far fa-eye-slash"
      (click)="_iconPressed('toggleTranslations')"
    ></i>
    <i
      class="far fa-question-circle"
      *ngIf="questionCircle"
    ></i>
    <i
      class="far fa-edit"
      *ngIf="edit"
      (click)="_iconPressed('onEditWord')"
    ></i
    ><i
      class="far fa-trash-alt"
      *ngIf="trash"
      (click)="_iconPressed('onDeleteWord')"
    ></i>
    <app-rating-ui
      uiType="stars"
      [score]="word.proficiency"
      ></app-rating-ui>
      <!-- *ngIf="!edit" -->
    <div class="tooltip">
      <span>{{ word.tips | titlecase }} </span>
    </div>
  </div>
  `,
  styles: [`      
  .ui-wrap {
    display: flex;
    align-items: center;
  }

  .tooltip {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-tips);
    border: 1px solid var(--border-tips);
    border-radius: 14px;
    position: absolute;
    height: 100%;
    padding: 5px;
    width: 83%;
    left: 0;
    transform: translateX(-110%);
    transition: 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    span {
      text-align: center;
    }
  }

  .fa-question-circle:hover ~ .tooltip {
    transform: translateX(0);
  }
  `
  ]
})
export class WordUiComponent {

  @Input() eye: boolean;
  @Input() eyeSlash: boolean;
  @Input() questionCircle: boolean;
  @Input() edit: boolean;
  @Input() trash: boolean;
  @Input() word: Word;

  @Output() iconPressed = new EventEmitter();

  _iconPressed(option) {
    this.iconPressed.emit({
      option: option,
      id: this.word.id
    });
  }

}
