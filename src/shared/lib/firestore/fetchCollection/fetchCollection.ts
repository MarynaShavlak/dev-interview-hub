import { getDocs, query } from 'firebase/firestore';
import { dataPoint } from '../firestore';

export async function fetchCollection<T extends object>(
    collectionName: string,
): Promise<T[]> {
    const collectionRef = dataPoint<T>(collectionName);
    const queryRef = query(collectionRef);
    const querySnapshot = await getDocs(queryRef);

    if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
    }
    throw new Error(`${collectionName} not found`);
}
