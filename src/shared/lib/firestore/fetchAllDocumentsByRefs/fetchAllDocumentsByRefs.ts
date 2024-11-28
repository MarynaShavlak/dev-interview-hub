import { getDoc, DocumentReference } from 'firebase/firestore';

export async function fetchAllDocumentsByRefs<T>(
    docRefs: DocumentReference[],
): Promise<T[]> {
    if (!docRefs || docRefs.length === 0) {
        return [];
    }

    const docSnapshots = await Promise.all(
        docRefs.map((docRef) => getDoc(docRef)),
    );

    return docSnapshots
        .map((docSnapshot) => docSnapshot.data())
        .filter((data) => data !== undefined)
        .map((data) => ({ ...data }) as T);
}
