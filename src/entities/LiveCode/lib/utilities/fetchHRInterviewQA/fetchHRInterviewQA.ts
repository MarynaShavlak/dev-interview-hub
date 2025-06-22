import { LiveCode } from '../../../model/types/liveCode';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';

export const fetchHRInterviewQA = async (id: string) => {
    const docRef = await getDocRefByField<LiveCode>('hrInterviewQA', 'id', id);

    const article = await fetchDocumentByRef<LiveCode>(docRef);
    return article;
};
