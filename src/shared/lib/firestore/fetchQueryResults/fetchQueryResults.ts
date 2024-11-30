import { Query, getDocs } from 'firebase/firestore';

/**
 * Executes a Firestore query and returns the documents as an array of the specified type.
 * @param queryRef - The Firestore query to execute.
 * @returns A Promise resolving to an array of documents.
 */
export const fetchQueryResults = async <T>(
    queryRef: Query<T>,
): Promise<T[]> => {
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map((doc) => doc.data());
};
