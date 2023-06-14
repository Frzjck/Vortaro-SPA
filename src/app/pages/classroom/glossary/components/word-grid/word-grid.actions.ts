import { createActionGroup, emptyProps } from "@ngrx/store";

export const GlossaryWordGridAction = createActionGroup(
    {
        source: 'Glossary Word Grid',
        events: {
            "Activate New Word Mode": emptyProps(),
        },
    }
) 