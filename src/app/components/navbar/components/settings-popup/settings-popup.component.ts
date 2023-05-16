import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExerciseModeType, TestingAgainstType, selectAllExerciseModes, selectExerciseMode, selectTestingAgainst } from '@app/pages/classroom/exercises/store';
import { ThemeType, selectActiveTheme, selectAllThemes, selectIsPixies } from '@app/store/app';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { SettingsPopupAction } from './settings-popup.actions';

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
      this.store.select(selectExerciseMode),
      this.store.select(selectAllExerciseModes),
      this.store.select(selectTestingAgainst),
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

  onModeChange(exerciseMode) {
    this.store.dispatch(SettingsPopupAction.changeExerciseMode(exerciseMode));
    // todo: Handle if Mode is changed during exercise
  }

  onThemeChange(activeTheme) {
    this.store.dispatch(SettingsPopupAction.changeTheme(activeTheme));
  }

  onChangeTestingAgainst(testingAgainst) {
    this.store.dispatch(SettingsPopupAction.changeWhatTestingAgainst(testingAgainst));
  }

  onTogglePixie() {
    this.store.dispatch(SettingsPopupAction.togglePixies());
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
