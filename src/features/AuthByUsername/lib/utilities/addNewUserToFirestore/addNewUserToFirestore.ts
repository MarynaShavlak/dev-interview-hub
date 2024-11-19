import { addDoc, Firestore } from 'firebase/firestore';
import { collection } from '@firebase/firestore';
import { UserFullInfo } from '@/entities/User';

export const addNewUserToFirestore = async (
    firestore: Firestore,
    userInfo: UserFullInfo,
) => {
    const usersReference = collection(firestore, 'users');
    const docRef = await addDoc(usersReference, userInfo);
    console.log('New user added to Firestore:', docRef.id);
    return docRef;
};
