import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.scss'],
  animations: [
    trigger('slideDown', [
      transition('* => *', [style({ height: 0, padding: 0 }), animate(300)]),
    ]),
  ],
})
export class SettingsPopupComponent implements OnInit, OnDestroy {
  subDropOpen = false;
  themeOpen = false;
  modeOpen = false;
  translateDirection: boolean;
  // Theme Select
  activeTheme: string;
  themes: string[] = ['blue', 'brown'];
  // Mode Select
  modes: string[] = ['quiz', 'spelling'];
  urlArr = [];

  activeMode: string;
  themeSub: Subscription;

  typeOfOS: string;

  pixie: boolean = false;

  constructor(private settings: SettingsService, private router: Router) {}

  ngOnInit(): void {
    this.themeSub = this.settings.activeThemeSub.subscribe((theme) => {
      this.activeTheme = theme;
    });
    this.activeMode = this.settings.exerciseMode;
    this.translateDirection = this.settings.translateDirection;

    this.pixie = this.settings.pixie;
  }

  ngOnDestroy(): void {
    this.subDropOpen = false;
    this.themeOpen = false;
    this.modeOpen = false;
    this.themeSub.unsubscribe();
  }

  onModeSelect() {
    this.settings.changeExerciseMode(this.activeMode);
    // Reload if Mode is changed during practice
    this.urlArr = this.router.url.split('/');
    this.urlArr.includes('quiz');
    if (this.urlArr.includes('quiz')) {
      let index = this.urlArr.indexOf('quiz');
      this.urlArr[index] = this.activeMode;
      this.urlArr.join('/');
    }
  }

  onThemeSelect() {
    this.settings.changeTheme(this.activeTheme);
  }

  onPalette() {
    this.subDropOpen = true;
    this.themeOpen = true;
    this.modeOpen = false;
  }

  onLightbulb() {
    this.subDropOpen = true;
    this.themeOpen = false;
    this.modeOpen = true;
  }

  onChangeTranslateDirection() {
    this.settings.changeTranslateDirection();
    this.translateDirection = this.settings.getTranslateDirection();
  }

  onTogglePixie() {
    this.settings.togglePixie();
  }
}
