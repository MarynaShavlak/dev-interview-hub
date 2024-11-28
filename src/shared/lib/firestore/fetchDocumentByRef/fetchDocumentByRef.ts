import { getDoc, DocumentReference } from 'firebase/firestore';

export async function fetchDocumentByRef<T>(
    docRef: DocumentReference | null,
): Promise<T> {
    if (docRef) {
        const docSnapshot = await getDoc(docRef);
        const data = docSnapshot.data();
        if (data) {
            return { ...data } as T;
        }
    }

    throw new Error(`Document not found`);
}
