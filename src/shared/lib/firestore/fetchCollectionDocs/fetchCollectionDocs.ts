import { getDocs, query, QuerySnapshot } from 'firebase/firestore';
import { dataPoint } from '../firestore';
import { FirestoreCollectionType } from '@/shared/types/firestoreCollections';

export async function fetchCollectionDocs<T extends object>(
    collectionName: FirestoreCollectionType,
): Promise<QuerySnapshot<T>> {
    const collectionRef = dataPoint<T>(collectionName);
    const queryRef = query(collectionRef);
    return getDocs(queryRef);
}
