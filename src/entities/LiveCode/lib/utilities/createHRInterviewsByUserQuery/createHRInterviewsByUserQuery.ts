import { Query, query, where, orderBy } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { LiveCode } from '../../../model/types/liveCode';

export const createHRInterviewsByUserQuery = (
    userId: string,
): Query<LiveCode> => {
    const collection = dataPoint<LiveCode>('hrInterviewQA');

    return query(
        collection,
        where('user.id', '==', userId),
        orderBy('createdAt', 'desc'),
    );
};
