import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
<div class="wrapper">
    <div class="spinner">
        <mat-progress-spinner [color]="color" [mode]="mode" [value]="value"></mat-progress-spinner>
    </div>
</div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 30;

  constructor() { }

  ngOnInit(): void {
  }
}
