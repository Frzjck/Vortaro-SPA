import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Word } from './words.models';
import * as fromActions from './words.actions';


export const adapter = createEntityAdapter<Word>();

export interface WordsState extends EntityState<Word> {
    loading: boolean;
    error: string;
}

export const initialState: WordsState = adapter.getInitialState({
    loading: null,
    error: null
});

export const reducer = createReducer(
    initialState,
    on(fromActions.readWords, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.readWordsSuccess, (state, { words }) => adapter.setAll(words, { ...state, loading: false })),
    on(fromActions.readWordsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(fromActions.createWord, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.createWordSuccess, (state, { word }) => adapter.addOne(word, { ...state, loading: false })),
    on(fromActions.createWordError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(fromActions.updateWord, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.updateWordSuccess, (state, { id, changes }) => (adapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(fromActions.updateWordError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(fromActions.deleteWord, (state) => ({ ...state, loading: true, error: null })),
    on(fromActions.deleteWordSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(fromActions.deleteWordError, (state, { error }) => ({ ...state, loading: false, error: error })),
);