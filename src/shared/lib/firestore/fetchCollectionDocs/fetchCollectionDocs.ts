import { getDocs, query, QuerySnapshot } from 'firebase/firestore';
import { dataPoint } from '../firestore';

export async function fetchCollectionDocs<T extends object>(
    collectionName: string,
): Promise<QuerySnapshot<T>> {
    const collectionRef = dataPoint<T>(collectionName);
    const queryRef = query(collectionRef);
    return getDocs(queryRef);
}
