import { createUserBasedQuery } from '../createUserBasedQuery/createUserBasedQuery';
import { fetchQueryResults } from '../fetchQueryResults/fetchQueryResults';
import { FirestoreCollectionType } from '@/shared/types/firestoreCollections';

export const fetchCollectionForUser = async <T extends object>(
    collectionName: FirestoreCollectionType,
    userId: string,
) => {
    const query = createUserBasedQuery<T>(collectionName, userId);
    const data = await fetchQueryResults<T>(query);
    return data;
};
