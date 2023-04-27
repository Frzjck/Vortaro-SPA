//GENERATE SERVICE
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlossaryState } from './glossary.state';



@Injectable(
    { providedIn: 'root' }
)
export class GlossaryStateFacade {
    constructor(private store: Store, private glossaryState: GlossaryState) { }
}