import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { selectIsResponseCorrect } from '@practice/store/practice/practice.selectors';
import { ExercisePageAction } from '@practice/store/practice/practice.actions';
import { selectAnswerLocked, selectCurrentExerciseMode } from '@practice/store/practice/practice.reducer';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private store: Store) { }

  async onSubmitAction(): Promise<void> {
    const isAnswerLocked = await firstValueFrom(this.store.select(selectAnswerLocked));
    //toggle submit action
    this.store.dispatch(ExercisePageAction.toggleAnswerLock());

    if (isAnswerLocked) {
      //if action is "next" -> dispatch next word(update index) and reset last correct answer. if no more words -> dispatch results (ondestroy results reset store)
      this.store.dispatch(ExercisePageAction.nextWord());
      return;
    }

    // else (action is proofread)
    //check if solution is correct
    const isCorrect = await firstValueFrom(this.store.select(selectIsResponseCorrect)) as boolean;
    this.store.dispatch(ExercisePageAction.addAnswerBoolToResults({ answerBool: isCorrect }));
    if ((await firstValueFrom(this.store.select(selectCurrentExerciseMode))) === "quiz") return;

    if (isCorrect) this.store.dispatch(ExercisePageAction.displayCorrectInInput())
    else this.store.dispatch(ExercisePageAction.displayWrongInInput())
    //dispatch resultScores update to store result
    //dispatch correct answer to store so it can be highlighted
  }
}
