import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Word } from './words.models';
import { GlossaryPageWordAction } from './words.actions';


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
    on(GlossaryPageWordAction.readWords, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageWordAction.readWordsSuccess, (state, { words }) => adapter.setAll(words, { ...state, loading: false })),
    on(GlossaryPageWordAction.readWordsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryPageWordAction.createFormWord, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageWordAction.createWordSuccess, (state, { word }) => adapter.addOne(word, { ...state, loading: false })),
    on(GlossaryPageWordAction.createWordError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryPageWordAction.updateWord, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageWordAction.updateWordSuccess, (state, { id, changes }) => (adapter.updateOne({
        id: id,
        changes: changes
    }, state))),
    on(GlossaryPageWordAction.updateWordError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryPageWordAction.deleteWord, (state) => ({ ...state, loading: true, error: null })),
    on(GlossaryPageWordAction.deleteWordSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(GlossaryPageWordAction.deleteWordError, (state, { error }) => ({ ...state, loading: false, error: error })),
);