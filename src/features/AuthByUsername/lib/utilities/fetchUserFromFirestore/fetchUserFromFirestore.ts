import { Firestore, getDocs, query, where, getDoc } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { User } from '@/entities/User';

export const fetchUserFromFirestore = async (
    firestore: Firestore,
    uid: string,
): Promise<User | null> => {
    const usersCollection = dataPoint<User>('users');
    const userQuery = query(usersCollection, where('id', '==', uid));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        const doc = await getDoc(userDocRef);
        return doc.data() ?? null;
    }

    return null;
};
