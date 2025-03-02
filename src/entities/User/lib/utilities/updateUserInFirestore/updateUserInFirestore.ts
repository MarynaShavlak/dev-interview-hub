import { getDoc, updateDoc } from 'firebase/firestore';
import { User } from '../../../model/types/user';
import { getUserDocRefById } from '../getUserDocRefById/getUserDocRefById';

export const updateUserInFirestore = async (
    userId: string,
    updates: Partial<User>,
) => {
    const userDocRef = await getUserDocRefById(userId);

    if (userDocRef) {
        await updateDoc(userDocRef, updates);
        const updatedDoc = await getDoc(userDocRef);
        const updatedData = updatedDoc.data();

        if (updatedData) {
            return {
                data: updatedData as User,
            };
        }
    }
    return null;
};
