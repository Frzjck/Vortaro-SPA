import * as functions from "firebase-functions";

import { db } from "./init";
import { testUserApp } from "./test-func";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

export const onAddWordUpdateGroupWordIdArray = functions.firestore.document("users/{userId}/groups/{groupId}/words/{wordId}").onCreate(async (snap, context) => {
    functions.logger.debug(`Running add course trigger for word id: ${context.params.wordId}`);

    return db.runTransaction(async (transaction) => {
        const groupRef = db.doc(`users/${context.params.userId}/groups/${context.params.groupId}`);
        const groupSnap = await transaction.get(groupRef);
        const group = groupSnap.data();
        group.wordIds.push(context.params.wordId);
        transaction.set(groupRef, group);
    });

})

export const onDeleteWordUpdateGroupWordIdArray = functions.firestore.document("users/{userId}/groups/{groupId}/words/{wordId}").onDelete(async (snap, context) => {
    functions.logger.debug(`Running delete course trigger for word id: ${context.params.wordId}`);

    return db.runTransaction(async (transaction) => {
        const groupRef = db.doc(`users/${context.params.userId}/groups/${context.params.groupId}`);
        const groupSnap = await transaction.get(groupRef);
        const group = groupSnap.data();
        group.wordIds = group.wordIds.filter(id => id !== context.params.wordId);
        transaction.set(groupRef, group);
    });
})


export const updateScores = functions.https.onCall(async (data, context) => {
    return { message: 'Documents updated successfully. submitResults$' };
});


export const cloudFunctionEndpointTest = functions.https.onRequest(testUserApp);