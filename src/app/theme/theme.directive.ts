import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from './symbols';
import { Store } from '@ngrx/store';
import { selectActiveTheme, selectThemeProperty } from '@app/store/app';

@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();

  constructor(
    private _elementRef: ElementRef,
    private _themeService: ThemeService,
    private _store: Store
  ) { }

  ngOnInit() {
    // const active = this._themeService.getActiveTheme();
    // if (active) {
    //   this.updateTheme(active);
    // }

    // this._themeService.themeChange
    //   .pipe(takeUntil(this._destroy$))
    //   .subscribe((theme: Theme) => this.updateTheme(theme));


    this._store.select(selectActiveTheme)
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme: Theme) => this.updateTheme(theme));

    this._store.select(selectThemeProperty('name'))
      .pipe(takeUntil(this._destroy$))
      .subscribe((name: string) => {
        // remove old theme
        const themeClasses = this._elementRef.nativeElement.classList;
        themeClasses.forEach(className => {
          if (className.endsWith('-theme')) {
            themeClasses.remove(className);
          }
        });

        // alias element with theme name
        themeClasses.add(`${name}-theme`);
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  // updateTheme(theme: Theme) {
  //   // project properties onto the element
  //   for (const key in theme.properties) {
  //     this._elementRef.nativeElement.style.setProperty(key, theme.properties[key]);
  //   }

  //   // remove old theme
  //   for (const name of this._themeService.theme) {
  //     this._elementRef.nativeElement.classList.remove(`${name}-theme`);
  //   }

  //   // alias element with theme name
  //   this._elementRef.nativeElement.classList.add(`${theme.name}-theme`);
  // }

  updateTheme(theme: Theme) {
    // project properties onto the element
    const elementStyle = this._elementRef.nativeElement.style;
    for (const key in theme.properties) {
      elementStyle.setProperty(key, theme.properties[key]);
    }
  }

}
