import { createActionGroup, emptyProps } from "@ngrx/store";

export const ResultsPageAction = createActionGroup(
    {
        source: 'Results Page',
        events: {
            "Reset Exercise State": emptyProps(),
        },
    }
)