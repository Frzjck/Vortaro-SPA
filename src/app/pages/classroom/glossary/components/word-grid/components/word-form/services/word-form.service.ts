import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class WordFormService {

  private addTranslation = new Subject<void>();
  addTranslation$ = this.addTranslation.asObservable();

  private addTips = new Subject<void>();
  addTips$ = this.addTips.asObservable();

  private closeForm = new Subject<void>();
  closeForm$ = this.closeForm.asObservable();

  private submitWordForm = new Subject<void>();
  submitWordForm$ = this.submitWordForm.asObservable();



}
