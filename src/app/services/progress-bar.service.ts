import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  constructor() {}
  progressEmitter = new Subject<number>();
}
