import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExercisePageAction, SubmitButtonActionType, TestingAgainstType, selectSubmitButtonAction, selectTestingAgainst } from '@exercises/store';
import { firstValueFrom } from 'rxjs';
import { Word } from '@app/pages/classroom/store/words-list';
@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  constructor(private store: Store) { }

  async onSubmitAction(word, inputValue): Promise<void> {
    const submitButtonAction = await firstValueFrom(this.store.select(selectSubmitButtonAction));

    if (submitButtonAction === SubmitButtonActionType.NEXT) {
      //if action is "next" -> dispatch next word(update index) and reset last correct answer. if no more words -> dispatch results (ondestroy results reset store)
      return;
    }

    const isCorrect = await this.isResponseCorrect(word, inputValue);
    this.store.dispatch(ExercisePageAction.saveAnswer({ answer: isCorrect }))
    // else (action is proofread)
    //check if solution is correct
    //dispatch resultScores update to store result
    //dispatch correct answer to store so it can be highlighted
    //change submit action to "next"
  }

  async isResponseCorrect(word: Word, response): Promise<boolean> {
    const testingAgainst = await firstValueFrom(this.store.select(selectTestingAgainst));

    if (testingAgainst === TestingAgainstType.TRANSLATION) return word.translation === response;

    else if (testingAgainst === TestingAgainstType.ORIGINAL) return word.original === response;
  }

}
