import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="content">
  <div class="container">
    <div class="progress-bar-container">
      <div
        class="progress-bar"
        [ngStyle]="{
          transform: 'translateX(' + _progress + '%)',
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
.progress-bar-container {
  border-radius: 0.5rem;
  background-color: var(--bg-tr-cnt);
  outline: var(--tr-border-sm);
  border: var(--sb-border);
  overflow: hidden;
  transition: all .5s ease-in;

  .progress-bar {
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
export class ProgressBarComponent {
  _progress: number

  @Input() set progress(value: number) {
    this._progress = value - 100;
  };

}
