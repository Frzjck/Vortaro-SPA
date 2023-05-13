import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExercisePageAction, SubmitButtonActionType, TestingAgainstType, selectIsResponseCorrect, selectSubmitButtonAction, selectTestingAgainst } from '@exercises/store';
import { firstValueFrom } from 'rxjs';
import { Word } from '@app/pages/classroom/store/words-list';
@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private store: Store) { }

  async onSubmitAction(): Promise<void> {
    const submitButtonAction = await firstValueFrom(this.store.select(selectSubmitButtonAction));
    //toggle submit action
    this.store.dispatch(ExercisePageAction.submitButtonActionToggle());

    if (submitButtonAction === SubmitButtonActionType.NEXT) {
      //if action is "next" -> dispatch next word(update index) and reset last correct answer. if no more words -> dispatch results (ondestroy results reset store)
      this.store.dispatch(ExercisePageAction.nextWord());
      return;
    }

    // else (action is proofread)
    //check if solution is correct
    const isCorrect = await firstValueFrom(this.store.select(selectIsResponseCorrect)) as boolean;
    if (isCorrect) this.store.dispatch(ExercisePageAction.displayCorrectInInput())
    else this.store.dispatch(ExercisePageAction.displayWrongInInput())
    //dispatch resultScores update to store result
    //dispatch correct answer to store so it can be highlighted
    this.store.dispatch(ExercisePageAction.addAnswerBoolToResults({ answerBool: isCorrect }));

  }


}
