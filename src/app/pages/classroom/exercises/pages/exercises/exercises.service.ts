import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExercisePageAction, SubmitButtonActionType, TestingAgainstType, selectSubmitButtonAction, selectTestingAgainst } from '@exercises/store';
import { firstValueFrom } from 'rxjs';
import { Word } from '@app/pages/classroom/store/words-list';
@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private store: Store) { }

  async onSubmitAction(word, inputValue): Promise<void> {
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
    const isCorrect = await this.isResponseCorrect(word, inputValue);
    //dispatch resultScores update to store result
    //dispatch correct answer to store so it can be highlighted
    this.store.dispatch(ExercisePageAction.addAnswerBoolToResults({ answerBool: isCorrect }));

  }

  async isResponseCorrect(word: Word, response): Promise<boolean> {
    const testingAgainst = await firstValueFrom(this.store.select(selectTestingAgainst));
    if (testingAgainst === TestingAgainstType.TRANSLATION) {
      const possibleAnswers = [word.translation.toLowerCase()]
      if (word.additionalTr?.length) possibleAnswers.push(...word.additionalTr.map((x) => x.toLocaleLowerCase()))

      return possibleAnswers.includes(response.toLowerCase());
    }
    else if (testingAgainst === TestingAgainstType.ORIGINAL) return word.original.toLowerCase() === response.toLowerCase();
  }
}
