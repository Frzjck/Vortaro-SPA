import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { GlossaryGroupPanelAction } from "./glossary.actions";
import { selectGroupById } from "@app/pages/classroom/store/groups-list";

@Injectable()
export class GlossaryEffects {
    constructor(
        private actions$: Actions,
        private store: Store
    ) { }


    unfoldAdditionalTranslationsGroup$ = createEffect(() => this.actions$.pipe(
        ofType(GlossaryGroupPanelAction.unfoldAdditionalTranslationsGroup),
        concatLatestFrom((action) => this.store.select(selectGroupById(action.groupId))),
        switchMap(([, group]) => {
            return [GlossaryGroupPanelAction.unfoldAdditionalTranslationsWords({ wordIds: group.wordIds })]
        }),
    )
    );
}