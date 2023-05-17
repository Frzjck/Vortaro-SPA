import { Directive, ElementRef, OnInit } from '@angular/core'

@Directive({
    selector: '[auto-focus]',
    standalone: true
})
export class AutoFocus implements OnInit {
    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.elementRef.nativeElement.focus();
    }

}