import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export interface Notification {
    message: string;
}

@Component({
    selector: 'app-notification',
    template: `<span>{{data.message}}</span>`,
    styles: []
})
export class NotificationComponent implements OnInit {

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Notification) { }

    ngOnInit(): void {
    }

}
