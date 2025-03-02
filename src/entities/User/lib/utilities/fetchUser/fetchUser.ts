import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';
import { User } from '../../..';
import { fetchDocumentByRef } from '@/shared/lib/firestore/fetchDocumentByRef/fetchDocumentByRef';

export const fetchUser = async (userId: string) => {
    const userDocRef = await getDocRefByField<User>('users', 'id', userId);
    const user = await fetchDocumentByRef<User>(userDocRef);
    return user;
};
