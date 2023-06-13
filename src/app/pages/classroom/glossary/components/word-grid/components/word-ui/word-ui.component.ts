import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingUIComponent } from '@glossary/shared';
import { Word } from '@classroom/store/words-list/words.models';

export interface WordUiViewInputInterface {
  eye: boolean;
  eyeSlash: boolean;
  editingMode: boolean;
  word: Word;
}

@Component({
  selector: 'app-word-ui',
  standalone: true,
  imports: [CommonModule, RatingUIComponent],
  template: `
  <ng-container *ngIf="wordUiViewInput as view">
    <div class="ui-wrap">
      <ng-template #editSet>
        <i
          class="far fa-edit"
          (click)="_iconPressed('edit')"
        ></i
        ><i
          class="far fa-trash-alt"
          (click)="_iconPressed('delete')"
        ></i>
      </ng-template>
      <ng-container *ngIf="!view.editingMode; else editSet">
        <i
          *ngIf="view.eye"
          class="far fa-eye"
          (click)="_iconPressed('unfoldTranslations')"
        ></i>
        <i
          *ngIf="view.eyeSlash"
          class="far fa-eye-slash"
          (click)="_iconPressed('foldTranslations')"
        ></i>
        <i
          class="far fa-question-circle"
        ></i>
        <app-rating-ui
          uiType="stars"
          [score]="view.word.proficiency"
          ></app-rating-ui>
        <div class="tooltip">
          <span>{{ view.word.tips | titlecase }} </span>
        </div>
      </ng-container>
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

  @Input() wordUiViewInput: WordUiViewInputInterface;

  @Output() iconPressed = new EventEmitter();

  _iconPressed(option) {
    this.iconPressed.emit({
      option: option,
      id: this.wordUiViewInput.word.id
    });
  }

}
