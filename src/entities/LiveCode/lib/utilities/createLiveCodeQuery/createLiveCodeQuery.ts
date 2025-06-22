import { query, Query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { LiveCode } from '../../../model/types/liveCode';

export const createLiveCodeQuery = (id: string): Query<LiveCode> => {
    const collection = dataPoint<LiveCode>('liveCodeTasks');
    return query(collection, where('id', '==', id));
};
