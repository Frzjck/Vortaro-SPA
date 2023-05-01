import { DocumentChangeAction } from '@angular/fire/compat/firestore';

export function convertSnaps<T>(results) {
	return results.docs.map((snap) => {
		return {
			id: snap.id,
			...(<any>snap.data()),
		};
	});
}


export const extractDocumentChangeActionData = (x: DocumentChangeAction<any>, addId = true) => {
	const data = x.payload.doc.data();

	if (addId) {
		data.id = x.payload.doc.id;
	}

	return data;
};
