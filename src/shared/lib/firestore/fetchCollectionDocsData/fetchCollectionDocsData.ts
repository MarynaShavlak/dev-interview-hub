import { fetchCollectionDocs } from '../fetchCollectionDocs/fetchCollectionDocs';
import { FirestoreCollectionType } from '@/shared/types/firestoreCollections';

export async function fetchCollectionDocsData<T extends object>(
    collectionName: FirestoreCollectionType,
): Promise<T[]> {
    const querySnapshot = await fetchCollectionDocs<T>(collectionName);

    if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
    }
    throw new Error(`${collectionName} not found`);
}
