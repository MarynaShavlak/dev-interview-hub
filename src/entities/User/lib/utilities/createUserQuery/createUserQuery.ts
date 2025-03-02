import { Query, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { User } from '../../../model/types/user';

export const createUserQuery = (userId: string): Query<User> => {
    const usersCollection = dataPoint<User>('users');
    return query(usersCollection, where('id', '==', userId));
};
