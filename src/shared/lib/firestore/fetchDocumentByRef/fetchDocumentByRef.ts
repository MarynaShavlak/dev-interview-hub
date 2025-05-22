import { getDoc, DocumentReference } from 'firebase/firestore';
import { assertExists } from '../../checks/assertExists/assertExists';

export async function fetchDocumentByRef<T>(
    docRef: DocumentReference | null,
): Promise<T> {
    assertExists(docRef, 'Document reference is null or undefined');

    const docSnapshot = await getDoc(docRef);
    const data = docSnapshot.data();
    assertExists(data, 'Document not found');
    return { ...data } as T;
}
