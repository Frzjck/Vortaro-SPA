import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './pages/modes/quiz/quiz.component';
import { SpellingComponent } from './pages/modes/spelling/spelling.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, QuizComponent, SpellingComponent, RouterModule],
  template: `
  <h1>exercises works!</h1>
  <img
    src="https://www.giantfreakinrobot.com/wp-content/uploads/2022/06/hellotherethumb.jpg"
    alt=""
    style="height: 15rem"
  />
  <h2>router outlet ↓</h2>
  <router-outlet></router-outlet>
  <h2>router outlet ↑</h2>
`,
  styles: [],
})
export class ExerciseContainerComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // if selected quiz redirect to quiz component
    // this.router.navigate(['results'], { relativeTo: this.route });
    // if selected spelling redirect to spelling component

  }

}
