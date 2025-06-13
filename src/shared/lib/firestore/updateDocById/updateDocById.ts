import {
    DocumentData,
    DocumentReference,
    getDoc,
    updateDoc,
} from 'firebase/firestore';
import { getDocRefByField } from '../getDocRefByField/getDocRefByField';
import { assertExists } from '../../checks/assertExists/assertExists';

/**
 * Updates a document in Firestore by its `id` field and returns the updated data.
 *
 * @param collectionName - Name of the collection (e.g., 'vocabularies').
 * @param id - The custom document ID stored in the `id` field.
 * @param updates - Partial data to update in the document.

 * @returns The updated document data of type T.
 */
export const updateDocById = async <T extends { id: string }>(
    collectionName: string,
    id: string,
    updates: Partial<T>,
): Promise<T> => {
    const docRef = await getDocRefByField<T>(collectionName, 'id', id);
    assertExists(
        docRef,
        `Document with id="${id}" not found in "${collectionName}"`,
    );

    await updateDoc(
        docRef as DocumentReference<T, DocumentData>,
        updates as DocumentData,
    );

    const updatedDoc = await getDoc(docRef);
    const updatedData = updatedDoc.data();

    assertExists(
        updatedData,
        `Failed to retrieve updated document with id="${id}" from "${collectionName}"`,
    );

    return updatedData as T;
};
