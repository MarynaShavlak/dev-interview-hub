import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../json-server/firebase';
import { User } from '../../src/entities/User';

export const fetchUserFromFirestore = async (
    uid: string,
): Promise<User | null> => {
    try {
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('id', '==', uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // Return the first matching user
            const userDoc = querySnapshot.docs[0];
            return userDoc.data() as User;
        }
        console.log('No user found with that ID');
        return null;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};
