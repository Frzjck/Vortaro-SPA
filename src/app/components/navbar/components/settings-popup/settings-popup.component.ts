import { Store } from '@ngrx/store';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';

import { SettingsPopupAction } from './settings-popup.actions';
import { ExerciseModeType, TestingAgainstType, ThemeType, selectActiveTheme, selectAllExerciseModes, selectAllThemes, selectBaseExerciseMode, selectBaseTestingAgainst, selectIsPixies } from '@app/store/app';

interface SettingsPopup {
  isPixies: boolean;
  activeTheme: ThemeType,
  allThemes: ThemeType[],
  exerciseMode: ExerciseModeType,
  allExerciseModes: ExerciseModeType[],
  testingAgainst: TestingAgainstType,
}

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

  vm$: Observable<SettingsPopup>;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.vm$ = combineLatest([
      this.store.select(selectIsPixies),
      this.store.select(selectActiveTheme),
      this.store.select(selectAllThemes),
      this.store.select(selectBaseExerciseMode),
      this.store.select(selectAllExerciseModes),
      this.store.select(selectBaseTestingAgainst),
    ]).pipe(
      map(([isPixies, activeTheme, allThemes, exerciseMode, allExerciseModes, testingAgainst]) => ({
        isPixies,
        activeTheme,
        allThemes,
        exerciseMode,
        allExerciseModes,
        testingAgainst,
      })
      ))
  }

  ngOnDestroy(): void {
    this.subDropOpen = false;
    this.themeOpen = false;
    this.modeOpen = false;
  }

  onTogglePixie() {
    this.store.dispatch(SettingsPopupAction.togglePixies());
  }

  onChangeTestingAgainst() {
    this.store.dispatch(SettingsPopupAction.toggleTestingAgainst());
  }

  onModeChange(exerciseMode) {
    this.store.dispatch(SettingsPopupAction.changeExerciseMode(exerciseMode));
    // todo: Handle if Mode is changed during exercise
  }

  onThemeChange(activeTheme) {
    this.store.dispatch(SettingsPopupAction.changeTheme({ activeTheme }));
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
}
