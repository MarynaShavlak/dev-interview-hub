import { addDoc, Firestore } from 'firebase/firestore';
import { collection } from '@firebase/firestore';
import { User } from '@/entities/User';
import { createFirestoreConverter } from '@/shared/lib/firestore/firestore';

export const addNewUserToFirestore = async (
    firestore: Firestore,
    userInfo: User,
) => {
    const userConverter = createFirestoreConverter<User>();
    const usersReference = collection(firestore, 'users').withConverter(
        userConverter,
    );
    const docRef = await addDoc(usersReference, userInfo);
    console.log('New user added to Firestore:', docRef.id);
    return docRef;
};
