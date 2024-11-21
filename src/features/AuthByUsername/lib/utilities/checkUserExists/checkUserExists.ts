import { Firestore, getDocs, query, where } from 'firebase/firestore';
import { collection } from '@firebase/firestore';
import { createFirestoreConverter } from '@/shared/lib/firestore/firestore';
import { User } from '@/entities/User';

export const checkUserExists = async (
    firestore: Firestore,
    uid: string,
): Promise<boolean> => {
    const userConverter = createFirestoreConverter<User>();
    const usersReference = collection(firestore, 'users').withConverter(
        userConverter,
    );
    const existingUserQuery = query(usersReference, where('id', '==', uid));
    const existingUserSnapshot = await getDocs(existingUserQuery);
    return !existingUserSnapshot.empty;
};
