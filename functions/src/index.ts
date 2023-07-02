import * as functions from "firebase-functions";

import { db } from "./init";
import { testUserApp } from "./test-func";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

export const onAddWordUpdateGroupWordIdArray = functions.firestore.document("users/{userId}/groups/{groupId}/words/{wordId}").onCreate(async (snap, context) => {
    functions.logger.debug(`Running add word trigger for word id: ${context.params.wordId}`);

    return db.runTransaction(async (transaction) => {
        const groupRef = db.doc(`users/${context.params.userId}/groups/${context.params.groupId}`);
        const groupSnap = await transaction.get(groupRef);
        const group = groupSnap.data();
        group.wordIds.push(context.params.wordId);
        transaction.set(groupRef, group);
    });

})

export const onDeleteWordUpdateGroupWordIdArray = functions.firestore.document("users/{userId}/groups/{groupId}/words/{wordId}").onDelete(async (snap, context) => {
    functions.logger.debug(`Running delete word trigger for word id: ${context.params.wordId}`);

    return db.runTransaction(async (transaction) => {
        const groupRef = db.doc(`users/${context.params.userId}/groups/${context.params.groupId}`);
        const groupSnap = await transaction.get(groupRef);
        const group = groupSnap.data();
        if (!group) return;
        group.wordIds = group.wordIds.filter(id => id !== context.params.wordId);
        transaction.set(groupRef, group);
    });
})

// export const onDeleteGroupCascadeDeleteWords = functions.firestore.document("users/{userId}/groups/{groupId}").onDelete(async (snap, context) => {
//     functions.logger.debug(`Running cascade delete group words trigger for group id: ${context.params.groupId}`);

//     return db.runTransaction(async (transaction) => {
//         const groupRef = db.doc(`users/${context.params.userId}/groups/${context.params.groupId}`);
//         const groupSnap = await transaction.get(groupRef);
//         const group = groupSnap.data();
//         group.wordIds.forEach(element => {

//         });
//         //  = group.wordIds.filter(id => id !== context.params.wordId); transaction.set(groupRef, group);
//     });
// })

export const onDeleteGroupCascadeDeleteWords = functions.firestore
    .document('users/{userId}/groups/{groupId}')
    .onDelete((snapshot, context) => {
        const userId = context.params.userId;
        const groupId = context.params.groupId;

        // Create a reference to the group document and the words collection
        const groupRef = db.collection(`users/${userId}/groups`).doc(groupId);
        const wordsRef = groupRef.collection('words');

        // Run a Firestore transaction to delete the group and its associated words
        return db.runTransaction(transaction => {
            // Get all the word documents in the collection
            return transaction.get(wordsRef)
                .then(wordSnapshot => {
                    // Delete each word document
                    wordSnapshot.forEach(wordDoc => {
                        transaction.delete(wordDoc.ref);
                    });

                    // Delete the group document
                    transaction.delete(groupRef);
                });
        })
            .catch(error => {
                console.error('Error deleting group words:', error);
            });
    });


export const updateScores = functions.https.onCall(async (data, context) => {
    return { message: 'Documents updated successfully. submitResults$' };
});


export const cloudFunctionEndpointTest = functions.https.onRequest(testUserApp);