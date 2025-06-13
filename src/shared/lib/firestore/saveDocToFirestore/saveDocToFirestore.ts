import { getDoc } from 'firebase/firestore';

import { addDocToFirestore } from '../addDocToFirestore/addDocToFirestore';
import { handleRequestErrorMessage } from '../handleRequestErrorMessage/handleRequestErrorMessage';

/**
 * Generic type for new documents without `createdAt` field
 */
export type NewDocDraft<T> = Omit<T, 'createdAt'>;

/**
 * Saves a document with a createdAt timestamp and returns the saved data.
 *
 * @param collectionName - Name of the Firestore collection.
 * @param newDoc - Document data (excluding `createdAt`).
 * @param retrievalErrorMessage - Optional error message to show if retrieval fails.
 * @returns The saved document's data with type T.
 */
export const saveDocToFirestore = async <T extends object>(
    collectionName: string,
    newDoc: NewDocDraft<T>,
    retrievalErrorMessage?: string,
): Promise<T> => {
    const docWithTimestamp = {
        ...newDoc,
        createdAt: new Date().toISOString(),
    } as T;

    const docRef = await addDocToFirestore<T>(collectionName, docWithTimestamp);
    const createdDocSnapshot = await getDoc(docRef);

    if (!createdDocSnapshot.exists() && retrievalErrorMessage) {
        handleRequestErrorMessage(retrievalErrorMessage);
    }

    return createdDocSnapshot.data() as T;
};
