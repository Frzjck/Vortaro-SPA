import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const UnknownPageGlossaryAction = createActionGroup(
    {
        source: 'Unknown Page',
        events: {
            Enter: emptyProps(),
            "Fold Additional Translations Group": emptyProps(),
            "Fold Additional Translations Word": props<{ wordId: string }>(),
            "Unfold Additional Translations Group": props<{ groupId: string }>(),
            "Unfold Additional Translations Word": props<{ wordId: string }>(),

            "Toggle Edit Group": props<{ groupId: string }>(),
            "Finish Edit Group": emptyProps(),

            "Edit Word": props<{ wordId: string }>(),
        },
    }
)

export const GlossaryGroupPanelAction = createActionGroup(
    {
        source: 'Glossary Page',
        events: {
            "Unfold Additional Translations Group": props<{ groupId: string }>(),
            "Unfold Additional Translations Words": props<{ wordIds: string[] }>(),


        },
    }
)

export const GlossaryWordUIAction = createActionGroup(
    {
        source: 'Glossary Word UI',
        events: {
            "Unfold Additional Translations Word": props<{ wordId: string }>(),
            "Fold Additional Translations Word": props<{ wordId: string }>(),
            "Edit Word": props<{ wordId: string }>(),
            "Delete Word": props<{ wordId: string }>(),
        },
    }
)