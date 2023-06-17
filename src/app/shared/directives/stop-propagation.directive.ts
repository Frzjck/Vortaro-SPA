import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]',
  standalone: true
})
export class StopPropagationDirective {
  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (key === 'Enter' || key === ' ') {
      event.stopPropagation();
    }
  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {
    event.stopImmediatePropagation();
  }
}