import { query, where, getDocs, DocumentReference } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { User } from '../../../model/types/user';

export const getUserDocRefById = async (
    userId: string,
): Promise<DocumentReference | null> => {
    const usersCollection = dataPoint<User>('users');
    const q = query(usersCollection, where('id', '==', userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].ref;
    }
    return null;
};
