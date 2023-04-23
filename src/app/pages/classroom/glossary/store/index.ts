import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromGlossary from './page-state/glossary.reducer';


export interface GlossaryState {
    glossary: fromGlossary.GlossaryState;
}

export const reducers: ActionReducerMap<GlossaryState> = {
    glossary: fromGlossary.reducer,
};

export const getGlossaryState = createFeatureSelector<GlossaryState>('glossary');
