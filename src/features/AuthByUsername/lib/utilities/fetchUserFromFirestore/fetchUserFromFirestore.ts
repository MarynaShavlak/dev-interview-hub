import {
    Firestore,
    collection,
    getDocs,
    query,
    where,
    getDoc,
} from 'firebase/firestore';
import { createFirestoreConverter } from '@/shared/lib/firestore/firestore';
import { User } from '@/entities/User';

export const fetchUserFromFirestore = async (
    firestore: Firestore,
    uid: string,
): Promise<User | null> => {
    const userConverter = createFirestoreConverter<User>();
    const usersReference = collection(firestore, 'users').withConverter(
        userConverter,
    );
    const userQuery = query(usersReference, where('id', '==', uid));
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        const doc = await getDoc(userDocRef);
        return doc.data() ?? null;
    }

    return null;
};
