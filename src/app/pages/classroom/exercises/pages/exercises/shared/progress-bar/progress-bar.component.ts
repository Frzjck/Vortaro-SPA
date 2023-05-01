import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressBarService } from '@app/services/progress-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="content">
  <div class="container">
    <div class="progressbar-container">
      <div
        class="progressbar"
        [ngStyle]="{
          transform: 'translateX(' + progress + '%)',
          transition: '0.2s ease'
        }"
      ></div>
    </div>
  </div>
</div>
  `,
  styles: [`
  .content {
  display: grid;
  justify-items: center;

  .container {
    width: clamp(10rem, 80vw, 40rem);

  }
}
.progressbar-container {
  border-radius: 0.5rem;
  background-color: var(--bg-tr-cnt);
  outline: var(--tr-border-sm);
  border: var(--sb-border);
  overflow: hidden;
  transition: all .5s ease-in;

  .progressbar {
    width: 100%;
    height: 1.4rem;
    background-color: var(--btn-hover);
    /* // transition: 0.5s ease; */
  }
}

@media (min-width: 768px) {
  .container {
    margin-top: 5vh;
  }
}
`],
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  private progressSub: Subscription;
  progress: number = -100;

  constructor(private progressService: ProgressBarService) { }

  ngOnInit(): void {
    this.progressSub = this.progressService.progressEmitter.subscribe((res) => {
      this.progress += res;
    });
  }
  ngOnDestroy(): void {
    this.progressSub.unsubscribe();
  }
}
