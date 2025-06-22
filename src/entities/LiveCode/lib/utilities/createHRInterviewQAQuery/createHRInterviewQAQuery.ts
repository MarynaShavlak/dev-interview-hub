import { query, Query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { LiveCode } from '../../../model/types/liveCode';

export const createHRInterviewQAQuery = (id: string): Query<LiveCode> => {
    const collection = dataPoint<LiveCode>('hrInterviewQA');
    return query(collection, where('id', '==', id));
};
