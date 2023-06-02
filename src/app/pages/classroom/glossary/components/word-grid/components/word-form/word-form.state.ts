import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface WordFormStateModel {
    wordForm: FormGroup;
}

const initialState = {
    wordForm: null,
};

@Injectable()
export class WordFormState extends ComponentStore<WordFormStateModel> {

    constructor() {
        super(initialState);
    }
    // ------------- State selectors:
    readonly wordForm$ = this.select(state => state.wordForm);

    // ------------- Updaters:
    readonly setForm = this.updater((state, wordForm: FormGroup) => ({
        ...state,
        wordForm,
    }));

    readonly clearForm = this.updater(() => ({
        ...initialState
    }));

}