import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, tap } from "rxjs";
import { selectGroupById } from "@classroom/store/groups-list/groups.selectors";
import { GlossaryGroupPanelAction } from "../../components/group-action-panel/group-action-panel.actions";

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