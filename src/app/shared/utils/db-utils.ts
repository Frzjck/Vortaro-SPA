import { DocumentChange } from '@angular/fire/firestore';

export function convertSnaps<T>(results) {
	return results.docs.map((snap) => {
		return {
			id: snap.id,
			...(<any>snap.data()),
		};
	});
}


export const extractDocumentChangeActionData = (x: DocumentChange<any>, addId = true) => {
	const data = x.doc.data();

	if (addId) {
		data.id = x.doc.id;
	}

	return data;
};
