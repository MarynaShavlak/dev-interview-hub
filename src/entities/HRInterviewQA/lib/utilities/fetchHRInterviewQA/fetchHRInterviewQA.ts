import { HRInterviewQA } from '../../../model/types/hrInterviewQA';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';

export const fetchHRInterviewQA = async (id: string) => {
    const docRef = await getDocRefByField<HRInterviewQA>(
        'hrInterviewQA',
        'id',
        id,
    );

    const article = await fetchDocumentByRef<HRInterviewQA>(docRef);
    return article;
};
