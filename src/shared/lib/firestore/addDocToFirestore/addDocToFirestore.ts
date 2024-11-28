import { addDoc, CollectionReference } from 'firebase/firestore';
import { dataPoint } from '../firestore';

/**
 * Generic utility function to add a document to a Firestore collection.
 * @param collectionName - The name of the Firestore collection.
 * @param docData - The data of the document to be added.
 * @returns The reference to the newly added document.
 */
export const addDocToFirestore = async <T extends object>(
    collectionName: string,
    docData: T,
) => {
    try {
        const collection: CollectionReference<T> = dataPoint<T>(collectionName);
        const docRef = await addDoc(collection, docData);
        console.log(
            `New document added to Firestore in collection "${collectionName}":`,
            docRef.id,
        );
        return docRef;
    } catch (error) {
        console.error(
            `Failed to add document to Firestore in collection "${collectionName}":`,
            error,
        );
        throw error;
    }
};
