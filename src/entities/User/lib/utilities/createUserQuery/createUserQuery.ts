import { Query, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { User } from '../../..';

// /**
//  * Creates a Firestore query for fetching article ratings by article ID and user ID.
//  * @param articleId - The ID of the article to fetch ratings for.
//  * @param userId - The ID of the user to fetch ratings for.
//  * @returns A Firestore Query instance configured for the article's ratings by user ID.
//  */

export const createUserQuery = (userId: string): Query<User> => {
    const usersCollection = dataPoint<User>('users');
    return query(usersCollection, where('id', '==', userId));
};
