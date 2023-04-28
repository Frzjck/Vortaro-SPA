//GENERATE SERVICE
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlossaryState } from './glossary.state';
import { Observable } from 'rxjs';
import { WordGridViewInterface } from './components/word-grid/word-grid.component';
import { GlossaryViewInterface } from './glossary.component';



@Injectable(
)
export class GlossaryStateFacade {
    constructor(private store: Store, private glossaryState: GlossaryState) { }

    // ViewModels and Interfaces:
    wordGridView$(): Observable<WordGridViewInterface> {
        return this.glossaryState.wordGridView$;
    }

    glossaryView$(): Observable<GlossaryViewInterface> {
        return this.glossaryState.glossaryView$;
    }

}