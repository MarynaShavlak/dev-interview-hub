import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import { User } from '../../src/entities/User';
import { firestore } from '../../json-server/firebase';

export const resetUserProfileInFirestore = async (
    profileId: string,
    defaultData: Partial<User>,
): Promise<Partial<User>> => {
    try {
        // Query to find the document where 'id' field matches profileId
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('id', '==', profileId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error(`No user found with id: ${profileId}`);
        }

        const userDoc = querySnapshot.docs[0];
        const userRef = doc(firestore, 'users', userDoc.id);

        await setDoc(userRef, defaultData, { merge: false });

        return defaultData;
    } catch (error) {
        throw new Error(`Failed to reset profile in Firestore: ${error}`);
    }
};
