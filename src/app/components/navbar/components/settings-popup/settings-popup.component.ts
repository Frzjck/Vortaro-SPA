import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

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

  // translateDirection: boolean;
  // Theme Select
  // activeTheme: string;
  // themes: string[] = ['blue', 'brown'];
  // Mode Select
  // modes: string[] = ['quiz', 'spelling'];
  // activeMode: string;
  // pixie: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subDropOpen = false;
    this.themeOpen = false;
    this.modeOpen = false;
  }

  onModeSelect() {

    // todo: Handle if Mode is changed during practice
  }

  onThemeSelect() {
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
  }

  onTogglePixie() {
  }
}
