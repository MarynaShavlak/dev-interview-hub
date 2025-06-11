import { Query, query, where, orderBy } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';

import { HRInterviewQA } from '../../../model/types/hrInterviewQA';

export const createHRInterviewsByUserQuery = (
    userId: string,
): Query<HRInterviewQA> => {
    const collection = dataPoint<HRInterviewQA>('hrInterviewQA');

    return query(
        collection,
        where('user.id', '==', userId),
        orderBy('createdAt', 'desc'),
    );
};
