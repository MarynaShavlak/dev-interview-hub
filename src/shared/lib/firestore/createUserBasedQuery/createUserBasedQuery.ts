import { orderBy, query, Query, where } from 'firebase/firestore';
import { dataPoint } from '../firestore';
import { FirestoreCollectionType } from '@/shared/types/firestoreCollections';

export const createUserBasedQuery = <T extends object>(
    collectionName: FirestoreCollectionType,
    userId: string,
): Query<T> => {
    const collectionRef = dataPoint<T>(collectionName);
    let field = '';
    if (
        collectionName === 'links' ||
        collectionName === 'questions' ||
        collectionName === 'vocabularies'
    ) {
        field = 'userId';
    } else {
        field = 'user.id';
    }

    return query(
        collectionRef,
        where(field, '==', userId),
        orderBy('createdAt', 'desc'),
    );
};
