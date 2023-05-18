import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserService } from '@app/pages/login/user.service';
import { Store, select } from '@ngrx/store';
import { User, getEmail, getUser, userSignOut } from "@app/store/user";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

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
  user$: Observable<User>;
  constructor(
    private breakPointObs: BreakpointObserver,
    public store: Store,

  ) { }

  ngOnInit(): void {

    this.user$ = this.store.pipe(select(getUser));

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
    this.store.dispatch(userSignOut());
  }

  onFocusoutSettings() { }
}
