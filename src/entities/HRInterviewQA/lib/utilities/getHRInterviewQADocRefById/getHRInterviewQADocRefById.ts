import { query, where, getDocs, DocumentReference } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { HRInterviewQA } from '../../../model/types/hrInterviewQA';

export const getHRInterviewQADocRefById = async (
    id: string,
): Promise<DocumentReference | null> => {
    const articlesCollection = dataPoint<HRInterviewQA>('hrInterviewQA');
    const q = query(articlesCollection, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].ref;
    }
    return null;
};
