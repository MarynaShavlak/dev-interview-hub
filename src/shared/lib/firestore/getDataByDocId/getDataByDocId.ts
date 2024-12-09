import { doc, getDoc } from 'firebase/firestore';
import { dataPoint } from '../firestore';

export async function getDataByDocId<T extends object>(
    collectionName: string,
    docId: string,
): Promise<T | null> {
    try {
        const collectionRef = dataPoint<T>(collectionName);
        const docRef = doc(collectionRef, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as T;
        }
        console.warn(`Document with ID ${docId} does not exist.`);
        return null;
    } catch (error) {
        console.error(`Failed to fetch document with ID ${docId}:`, error);
        return null;
    }
}
