import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const GlossaryGroupPanelAction = createActionGroup(
    {
        source: 'Glossary Page',
        events: {
            "Unfold Additional Translations Group": props<{ groupId: string }>(),
            "Unfold Additional Translations Words": props<{ wordIds: string[] }>(),
            "Fold Additional Translations Group": emptyProps(),

            "Toggle Edit Group": props<{ groupId: string }>(),
            "Delete Group": props<{ groupId: string }>(),
        },
    }
)
