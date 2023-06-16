import { createActionGroup, props } from "@ngrx/store";

export const GlossaryWordUIAction = createActionGroup(
    {
        source: 'Glossary Word UI',
        events: {
            "Unfold Additional Translations Word": props<{ wordId: string }>(),
            "Fold Additional Translations Word": props<{ wordId: string }>(),
            "Edit Word": props<{ wordId: string }>(),
            "Delete Word": props<{ wordId: string, groupId: string }>(),
        },
    }
)
