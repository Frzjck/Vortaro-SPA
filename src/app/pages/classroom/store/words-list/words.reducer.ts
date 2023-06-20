import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Word } from './words.models';
import { WordFormAction } from '@glossary/components/word-grid/components/word-form/word-form.actions';
import { GlossaryWordUIAction } from '../../glossary/components/word-grid/components/word-ui/word-ui.actions';
import { UnknownPageWordAction, WordAPIResponseAction } from './words.actions';


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
    on(WordAPIResponseAction.readWordsSuccess, (state, { words }) => adapter.setAll(words, { ...state, loading: false })),
    on(WordAPIResponseAction.readWordsError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(WordFormAction.createWord, (state) => ({ ...state, loading: true, error: null })),
    on(WordAPIResponseAction.createWordSuccess, (state, { word }) => adapter.addOne(word, { ...state, loading: false })),
    on(WordAPIResponseAction.createWordError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(WordFormAction.updateWord, (state) => ({ ...state, loading: true, error: null })),
    on(WordAPIResponseAction.updateWordSuccess, (state, { wordId, changes }) => (adapter.updateOne({
        id: wordId,
        changes: changes
    }, state))),
    on(WordAPIResponseAction.updateWordError, (state, { error }) => ({ ...state, loading: false, error: error })),

    on(GlossaryWordUIAction.deleteWord, (state) => ({ ...state, loading: true, error: null })),
    on(WordAPIResponseAction.deleteWordSuccess, (state, { wordId }) => adapter.removeOne(wordId, state)),
    on(WordAPIResponseAction.deleteWordError, (state, { error }) => ({ ...state, loading: false, error: error })),
);