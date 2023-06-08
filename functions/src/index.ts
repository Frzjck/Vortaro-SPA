import * as functions from "firebase-functions";

import { db } from "./init";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

export const onAddWordUpdateGroupWordIdArray = functions.firestore.document("users/{userId}/groups/{groupId}/words/{wordId}").onCreate(async (snap, context) => {
    functions.logger.debug(`Running add course trigger for word id: ${context.params.wordId}`);
    response.send("Hello from Firebase!");

})

export const onDeleteWordUpdateGroupWordIdArray = functions.firestore.document("users/{userId}/groups/{groupId}/words/{wordId}").onDelete(async (snap, context) => {
    functions.logger.debug(`Running delete course trigger for word id: ${context.params.wordId}`)
})