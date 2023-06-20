import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="app-page">
  <div class="app-page__header">
    <h1>Demo</h1>
  </div>
  <div class="app-page__content">
    <div class="navigation">
      <a class="app-a" routerLink="./styles" routerLinkActive="app-a_active"
        >Styles</a
      >
      <a class="app-a" routerLink="./shared" routerLinkActive="app-a_active"
        >Shared</a
      >
    </div>
    <router-outlet></router-outlet>
  </div>
  </div>
  `,
  styles: [`
  .navigation {
    padding: 20px 0;
    }`
  ]
})

export class DemoComponent {

}
