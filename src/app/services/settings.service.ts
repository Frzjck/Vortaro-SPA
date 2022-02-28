import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  activeTheme = 'blue';
  activeThemeSub = new BehaviorSubject<string>(this.activeTheme);
  // This option determines what is being tested, your knowledge of meaning of a foreign word if true,
  // and your knowledge of spelling if false
  // Next two settings are updated on app.component load
  translateDirection = true;

  exerciseMode = 'quiz';
  exerciseModeSub = new BehaviorSubject<string>(this.exerciseMode);

  pixie = false;
  pixieSub = new BehaviorSubject<boolean>(this.pixie);
  constructor() {}

  // ---------- Pixie Toggle ----------
  getPixieStatus() {
    if (localStorage.getItem('pixie')) {
      this.pixie = JSON.parse(localStorage.getItem('pixie'));
    }
    this.pixieSub.next(this.pixie);
  }

  togglePixie() {
    this.pixie = !this.pixie;
    localStorage.setItem('pixie', this.pixie.toString());
    this.pixieSub.next(this.pixie);
  }
  // ---------- Pixie Toggle END ----------

  // ---------- Exercise Mode ----------
  getExerciseMode() {
    if (localStorage.getItem('exerciseMode')) {
      this.exerciseMode = localStorage.getItem('exerciseMode');
    }
    this.exerciseModeSub.next(this.exerciseMode);
    return this.exerciseMode;
  }

  changeExerciseMode(newMode) {
    this.exerciseMode = newMode;
    localStorage.setItem('exerciseMode', this.exerciseMode);
    this.exerciseModeSub.next(newMode);
  }
  // ---------- Exercise Mode END ----------

  // ---------- TranslateDirection ----------
  getTranslateDirection() {
    if (localStorage.getItem('translateDirection')) {
      this.translateDirection = JSON.parse(
        localStorage.getItem('translateDirection')
      );
    }
    return this.translateDirection;
  }

  changeTranslateDirection() {
    this.translateDirection = !this.translateDirection;
    localStorage.setItem(
      'translateDirection',
      this.translateDirection.toString()
    );
  }
  // ---------- TranslateDirection END ----------

  // ---------- Theme functions ----------
  getTheme() {
    if (localStorage.getItem('theme')) {
      this.activeTheme = localStorage.getItem('theme');
    }
    this.activeThemeSub.next(this.activeTheme);
  }

  changeTheme(newTheme) {
    this.activeTheme = newTheme;
    localStorage.setItem('theme', this.activeTheme);
    this.activeThemeSub.next(newTheme);
  }
  // ---------- Theme functions END ----------

  // ---------- AUTH functions  ----------
  // private saveAuthData(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // private clearAuthData() {
  //   localStorage.removeItem('token');
  // }

  // private getAuthData() {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return;
  //   }
  //   return {
  //     token: token,
  //   };
  // }
  // ---------- AUTH functions END ----------
}
