import {
    type QueryDocumentSnapshot,
    type FirestoreDataConverter,
    type DocumentData,
} from 'firebase/firestore';
import { collection } from '@firebase/firestore';
import { firestore } from '../../../../json-server/firebase';

export const createFirestoreConverter = <T>(): FirestoreDataConverter<T> => ({
    /**
     * Converts the given data to a Firestore-compatible format.
     * @param data - The data object to convert.
     * @returns The same data object, assuming it is already structured correctly.
     */
    toFirestore(data: T): DocumentData {
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data provided to Firestore converter.');
        }
        return data;
    },

    /**
     * Converts a Firestore document snapshot into the desired object type.
     * @param snap - The Firestore document snapshot.
     * @returns The typed object from Firestore data.
     */
    fromFirestore(snap: QueryDocumentSnapshot): T {
        const data = snap.data();
        if (!data) {
            throw new Error('Document snapshot is empty or undefined.');
        }
        return data as T;
    },
});

/**
 * Creates a Firestore data point with type-safe conversion.
 * @param collectionPath - The path to the Firestore collection.
 * @returns A Firestore CollectionReference with a type-safe converter applied.
 * @throws An error if the `collectionPath` is invalid.
 */
export const dataPoint = <T extends object>(collectionPath: string) => {
    if (!collectionPath) {
        throw new Error(
            'Invalid collection path. It must be a non-empty string.',
        );
    }

    const converter = createFirestoreConverter<T>();
    return collection(firestore, collectionPath).withConverter(converter);
};
