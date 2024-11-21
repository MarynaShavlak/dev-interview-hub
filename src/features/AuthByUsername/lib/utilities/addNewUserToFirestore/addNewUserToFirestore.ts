import { addDoc } from 'firebase/firestore';
import { User } from '@/entities/User';
import { dataPoint } from '@/shared/lib/firestore/firestore';

export const addNewUserToFirestore = async (userInfo: User) => {
    const usersCollection = dataPoint<User>('users');
    const docRef = await addDoc(usersCollection, userInfo);
    console.log('New user added to Firestore:', docRef.id);
    return docRef;
};
