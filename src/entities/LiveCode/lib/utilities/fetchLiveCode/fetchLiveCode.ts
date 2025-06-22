import { LiveCode } from '../../../model/types/liveCode';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';

export const fetchLiveCode = async (id: string) => {
    const docRef = await getDocRefByField<LiveCode>('liveCodeTasks', 'id', id);

    const data = await fetchDocumentByRef<LiveCode>(docRef);
    return data;
};
