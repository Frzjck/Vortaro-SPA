import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './components/modes/quiz/quiz.component';
import { SpellingComponent } from './components/modes/spelling/spelling.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCurrentRoute } from '@app/store/router/router.selector';
import { ResultsComponent } from './components/results/results.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, QuizComponent, SpellingComponent, RouterModule, ResultsComponent],
  template: `
    <ng-container [ngSwitch]="content">
      <app-spelling *ngSwitchCase="'spelling'" />
      <app-quiz *ngSwitchCase="'quiz'" />
      <app-results *ngSwitchCase="'results'" />
    </ng-container>
`,
  styles: [],
})
export class ExerciseContainerComponent {

  constructor(private store: Store) { }

  public content = 'results';

  ngOnInit(): void {
    // if selected quiz redirect to quiz component
    // this.router.navigate(['results'], { relativeTo: this.route });
    // if selected spelling redirect to spelling component
    this.store.select(getCurrentRoute).subscribe((router) => {
      console.log("ROUTER", router);
      // console.log("ROUTER", router.urlSegment?[0].path);
    });

  }

}
