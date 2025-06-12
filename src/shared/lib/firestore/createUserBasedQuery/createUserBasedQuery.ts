import { Query, query, where, orderBy } from 'firebase/firestore';
import { dataPoint } from '../firestore';

export const createUserBasedQuery = <T extends object>(
    collectionName: string,
    userId: string,
): Query<T> => {
    const collectionRef = dataPoint<T>(collectionName);

    return query(
        collectionRef,
        where('user.id', '==', userId),
        orderBy('createdAt', 'desc'),
    );
};
