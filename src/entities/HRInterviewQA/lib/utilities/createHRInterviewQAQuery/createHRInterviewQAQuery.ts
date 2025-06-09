import { query, Query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { HRInterviewQA } from '../../../model/types/hrInterviewQA';

export const createHRInterviewQAQuery = (id: string): Query<HRInterviewQA> => {
    const collection = dataPoint<HRInterviewQA>('hrInterviewQA');
    return query(collection, where('id', '==', id));
};
