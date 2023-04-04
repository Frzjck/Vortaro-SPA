import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '../login/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('popup', [
      transition('void => *', [
        style({ transform: 'scale(0)', zIndex: '-1' }),
        animate(200),
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'scale(0)', zIndex: '-1' })),
      ]),
    ]),
    trigger('mob-settings', [
      transition('void => *', [style({ height: 0 }), animate(200)]),
      transition('* => void', [animate(200, style({ height: 0 }))]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean;
  dropdownOpen = false;
  dropdownMobileOpen = false;
  myTimeout;
  constructor(
    private breakPointObs: BreakpointObserver,
    public user: UserService
  ) { }

  ngOnInit(): void {
    this.breakPointObs
      .observe(['(max-width: 768px)', '(min-width: 768px)'])
      .subscribe((result) => {
        if (result.matches) {
          this.menuOpen = false;
        }
      });
  }
  // Auto Close Timer
  startTimer() {
    if (this.dropdownOpen === false) return;
    this.stopTimer();
    this.myTimeout = setTimeout(() => {
      this.dropdownOpen = false;
    }, 1600);
  }

  stopTimer() {
    clearTimeout(this.myTimeout);
  }

  onOpenMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onSettings() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  onSettingsMobile() {
    this.dropdownMobileOpen = !this.dropdownMobileOpen;
  }

  logout() {
    this.user.logout()
  }

  onFocusoutSettings() { }
}
