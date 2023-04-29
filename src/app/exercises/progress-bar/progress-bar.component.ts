import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressBarService } from '@app/services/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
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
  ngOnDestroy(): void { }
}
