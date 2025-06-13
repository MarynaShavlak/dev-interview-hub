import { createUserBasedQuery } from '../createUserBasedQuery/createUserBasedQuery';
import { fetchQueryResults } from '../fetchQueryResults/fetchQueryResults';

export const fetchCollectionForUser = async <T extends object>(
    collectionName: string,
    userId: string,
) => {
    const query = createUserBasedQuery<T>(collectionName, userId);
    const data = await fetchQueryResults<T>(query);
    return data;
};
