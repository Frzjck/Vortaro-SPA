import { createActionGroup, emptyProps, props } from "@ngrx/store";




export const GlossaryPageAction = createActionGroup(
    {
        source: 'Glossary Page',
        events: {
            "New Group Mode": emptyProps(),
            "Rename Group Mode": props<{ groupId: string }>(),
        },
    }
)
