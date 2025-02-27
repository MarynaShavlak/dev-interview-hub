import { fetchCollectionDocs } from '../fetchCollectionDocs/fetchCollectionDocs';

export async function fetchCollectionDocsData<T extends object>(
    collectionName: string,
): Promise<T[]> {
    const querySnapshot = await fetchCollectionDocs<T>(collectionName);

    if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
    }
    throw new Error(`${collectionName} not found`);
}
