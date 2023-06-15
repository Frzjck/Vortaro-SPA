import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Word } from './words.models';
import { UnknownPageWordAction } from './words.actions';
import { WordFormAPIAction, WordFormAction } from '@glossary/components/word-grid/components/word-form/word-form.actions';


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
    on(UnknownPageWordAction.readWords, (state) => ({ ...state, loading: true, error: null })),
    on(UnknownPageWordAction.readWordsSuccess, (state, { words }) => adapter.setAll(words, { ...state, loading: false })),
    on(UnknownPageWordAction.readWordsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(WordFormAction.createWord, (state) => ({ ...state, loading: true, error: null })),
    on(WordFormAPIAction.createWordSuccess, (state, { word }) => adapter.addOne(word, { ...state, loading: false })),
    on(WordFormAPIAction.createWordError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(UnknownPageWordAction.updateWord, (state) => ({ ...state, loading: true, error: null })),
    on(WordFormAPIAction.updateWordSuccess, (state, { id, changes }) => (adapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(UnknownPageWordAction.updateWordError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(UnknownPageWordAction.deleteWord, (state) => ({ ...state, loading: true, error: null })),
    on(UnknownPageWordAction.deleteWordSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(UnknownPageWordAction.deleteWordError, (state, { error }) => ({ ...state, loading: false, error: error })),
);