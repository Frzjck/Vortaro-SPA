import { InjectionToken } from '@angular/core';

export const THEMES = new InjectionToken<Theme[]>('THEMES');
export const ACTIVE_THEME = new InjectionToken<string>('ACTIVE_THEME');

export interface Theme {
  name: string;
  properties: any;
}

export interface ThemeOptions {
  themes: Theme[];
  active: string;
}
