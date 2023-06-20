import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


export type ButtonType = 'button' | 'submit';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button class="app-button" [type]="type">
    <ng-content></ng-content>
    </button>
`,
    styles: []
})
export class ButtonComponent implements OnInit {

    @Input() type: ButtonType;

    constructor() {
        this.type = 'button';
    }

    ngOnInit(): void {
    }

}
