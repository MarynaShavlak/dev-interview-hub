import {
    type QueryDocumentSnapshot,
    type FirestoreDataConverter,
    type DocumentData,
} from 'firebase/firestore';

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
