import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingUIComponent } from '@glossary/shared';
import { Word } from '@app/pages/classroom/store/words-list';

export interface WordUiComponentInterface {
  eye: boolean;
  eyeSlash: boolean;
  questionCircle: boolean;
  edit: boolean;
  trash: boolean;
  word: Word;
}

@Component({
  selector: 'app-word-ui',
  standalone: true,
  imports: [CommonModule, RatingUIComponent],
  template: `
  <ng-container *ngIf="wordUiInterface as view">
    <div class="ui-wrap">
      <i
        *ngIf="view.eye"
        class="far fa-eye"
        (click)="_iconPressed('toggleTranslations')"
      ></i>
      <i
        *ngIf="view.eyeSlash"
        class="far fa-eye-slash"
        (click)="_iconPressed('toggleTranslations')"
      ></i>
      <i
        class="far fa-question-circle"
        *ngIf="view.questionCircle"
      ></i>
      <i
        class="far fa-edit"
        *ngIf="view.edit"
        (click)="_iconPressed('onEditWord')"
      ></i
      ><i
        class="far fa-trash-alt"
        *ngIf="view.trash"
        (click)="_iconPressed('onDeleteWord')"
      ></i>
      <app-rating-ui
        uiType="stars"
        [score]="word.proficiency"
        ></app-rating-ui>
      <div class="tooltip">
        <span>{{ word.tips | titlecase }} </span>
      </div>
    </div>
  </ng-container>
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

  @Input() wordUiInterface: WordUiComponentInterface;

  @Output() iconPressed = new EventEmitter();

  _iconPressed(option) {
    this.iconPressed.emit({
      option: option,
      id: this.wordUiInterface.word.id
    });
  }

}
