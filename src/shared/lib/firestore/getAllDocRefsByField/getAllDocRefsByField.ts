import {
    QueryConstraint,
    DocumentReference,
    where,
    query,
    getDocs,
} from 'firebase/firestore';
import { dataPoint } from '../firestore';

export async function getAllDocRefsByField<T extends object>(
    collectionName: string,
    field: keyof T,
    value: any,
): Promise<DocumentReference[]> {
    const collection = dataPoint<T>(collectionName);
    const queryConstraint: QueryConstraint = where(
        field as string,
        '==',
        value,
    );
    const q = query(collection, queryConstraint);
    const querySnapshot = await getDocs(q);

    // Map through the docs and return their references
    return querySnapshot.docs.map((doc) => doc.ref);
}
