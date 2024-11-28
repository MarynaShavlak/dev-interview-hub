import {
    query,
    where,
    getDocs,
    DocumentReference,
    QueryConstraint,
} from 'firebase/firestore';
import { dataPoint } from '../firestore';

/**
 * Get a Firestore document reference by a field value.
 * @param collectionName - The name of the Firestore collection.
 * @param field - The field to filter by.
 * @param value - The value to match for the field.
 * @returns The DocumentReference if found, or null if not.
 */
export async function getDocRefByField<T extends object>(
    collectionName: string,
    field: keyof T,
    value: any,
): Promise<DocumentReference | null> {
    const collection = dataPoint<T>(collectionName);
    const queryConstraint: QueryConstraint = where(
        field as string,
        '==',
        value,
    );
    const q = query(collection, queryConstraint);
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].ref;
    }
    return null;
}
