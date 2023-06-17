import firebase from "firebase/compat/app";

import { FireGroupCreateRequest, FireGroupUpdateRequest } from "@app/models/backend/group";
import { FormGroup } from "../glossary/components/group-form/models";
import { Group } from "../store/groups-list/groups.models";

export const formGroupToNewFireGroup = (group: FormGroup): FireGroupCreateRequest => {
    return {
        ...group,
        wordIds: [],
        created: firebase.firestore.FieldValue.serverTimestamp(),
    };
};
export const formGroupToNewGroup = (group: FormGroup, id: string): Group => {
    return {
        ...group,
        wordIds: [],
        averageProficiency: 1,
        id
    };
};

export const formGroupToUpdatedFireGroup = (group: FormGroup): FireGroupUpdateRequest => {
    return {
        ...group,
        updated: firebase.firestore.FieldValue.serverTimestamp()
    };
};