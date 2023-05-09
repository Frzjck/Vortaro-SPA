import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  constructor() { }

  onSubmitAction() {
    //if action is next-> dispatch next word(update index) and reset last correct answer. if no more words -> dispatch results (ondestroy results reset store)

    // else (action is proofread)
    //check if solution is correct
    //dispatch resultScores update to store result
    //dispatch correct answer to store so it can be highlighted
    //change action to next
  }
}
