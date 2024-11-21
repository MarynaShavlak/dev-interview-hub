import { getDocs, query, where } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { User } from '@/entities/User';

export const checkUserExists = async (uid: string): Promise<boolean> => {
    const usersCollection = dataPoint<User>('users');
    const existingUserQuery = query(usersCollection, where('id', '==', uid));
    const existingUserSnapshot = await getDocs(existingUserQuery);
    return !existingUserSnapshot.empty;
};
