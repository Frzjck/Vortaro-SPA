import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { selectAllExerciseModes, selectExerciseMode, selectTestingAgainst } from '@app/pages/classroom/exercises/store';
import { selectActiveTheme, selectAllThemes, selectIsPixies } from '@app/store/app';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';

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
  pixies$: Observable<boolean>;
  activeTheme$
  getAllThemes$
  activeMode$
  allExerciseModes$
  testingAgainst$

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.pixies$ = this.store.select(selectIsPixies);
    this.activeTheme$ = this.store.select(selectActiveTheme);
    this.getAllThemes$ = this.store.select(selectAllThemes);
    this.activeMode$ = this.store.select(selectExerciseMode);
    this.allExerciseModes$ = this.store.select(selectAllExerciseModes);
    this.testingAgainst$ = this.store.select(selectTestingAgainst);

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
