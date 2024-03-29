import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { selectIsPixies } from '@app/store/app/app.selectors';


@Component({
  selector: 'app-root',
  template: `

<main theme class="globalVars">
  <div class="streetlight">
    <img
      class="img-container"
      draggable="false"
      src="assets/imgs/streetlight.webp"
      alt="streetlight"
    />
    <div class="light-blob"></div>
  </div>

  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  <div class="blobs-box" *ngIf="pixies$ | async" @fadeIn>
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>

    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>
    <div class="blob" *ngIf="extraPixies"></div>
  </div>
</main>`,
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [style({ opacity: 0 }), animate(4200)]),
      transition('* => void', [animate(4200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  extraPixies: boolean = false;
  typeOfOS: string;


  activeTheme: string;
  pixies$;
  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.typeOfOS = window.navigator.platform;
    if (this.windowsPlatforms.includes(this.typeOfOS)) {
      this.extraPixies = true;
    }

    this.pixies$ = this.store.select(selectIsPixies);
  }
}
