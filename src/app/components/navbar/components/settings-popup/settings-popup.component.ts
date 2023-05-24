import { Store } from '@ngrx/store';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';

import { SettingsPopupAction } from './settings-popup.actions';
import { ExerciseModeType, TestingAgainstType, selectActiveThemeName, selectAllExerciseModes, selectAllThemeNames, selectBaseExerciseMode, selectBaseTestingAgainst, selectIsPixies } from '@app/store/app';

interface SettingsPopupInterface {
  isPixies: boolean;
  activeThemeName: string,
  allThemeNames: string[],
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

  vm$: Observable<SettingsPopupInterface>;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.vm$ = combineLatest([
      this.store.select(selectIsPixies),
      this.store.select(selectActiveThemeName),
      this.store.select(selectAllThemeNames),
      this.store.select(selectBaseExerciseMode),
      this.store.select(selectAllExerciseModes),
      this.store.select(selectBaseTestingAgainst),
    ]).pipe(
      map(([isPixies, activeThemeName, allThemeNames, exerciseMode, allExerciseModes, testingAgainst]) => ({
        isPixies,
        activeThemeName,
        allThemeNames,
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

  onModeChange(baseExerciseMode) {
    this.store.dispatch(SettingsPopupAction.changeExerciseMode({ baseExerciseMode }));
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
