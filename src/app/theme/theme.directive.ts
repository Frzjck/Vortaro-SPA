import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectActiveTheme, selectThemeProperty } from '@app/store/app/app.selectors';
import { Theme } from '@app/store/app/app.reducer';

// Angular Directive Theme Source https://medium.com/@amcdnl/theming-angular-with-css-variables-3c78a5b20b24
@Directive({
  selector: '[theme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();

  constructor(
    private _elementRef: ElementRef,
    private _store: Store
  ) { }

  ngOnInit() {
    this._store.select(selectActiveTheme)
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme: Theme) => this.updateElementProperties(theme));

    this._store.select(selectThemeProperty('name'))
      .pipe(takeUntil(this._destroy$))
      .subscribe((name: string) => this.updateElementClass(name));
  }

  updateElementClass(className) {
    // remove old theme
    const themeClasses = this._elementRef.nativeElement.classList;
    themeClasses.forEach(className => {
      if (className.endsWith('-theme')) themeClasses.remove(className);
    });
    // alias element with theme name
    themeClasses.add(`${className}-theme`);
  }

  updateElementProperties(theme: Theme) {
    // project properties onto the element
    const elementStyle = this._elementRef.nativeElement.style;
    for (const key in theme.properties) elementStyle.setProperty(key, theme.properties[key]);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
