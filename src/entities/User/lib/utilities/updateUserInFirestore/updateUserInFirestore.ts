import { getDoc, updateDoc } from 'firebase/firestore';
import { User } from '../../../model/types/user';
import { getUserDocRefById } from '../getUserDocRefById/getUserDocRefById';
import { ERROR_USER_MESSAGES } from '../../../model/consts/errorUserMessages';

export const updateUserInFirestore = async (
    userId: string,
    updates: Partial<User>,
) => {
    const userDocRef = await getUserDocRefById(userId);
    if (!userDocRef) {
        throw new Error(ERROR_USER_MESSAGES.USER_NOT_FOUND(userId));
    }

    await updateDoc(userDocRef, updates);
    const updatedDoc = await getDoc(userDocRef);
    const updatedData = updatedDoc.data();
    if (!updatedData) {
        throw new Error(
            ERROR_USER_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(userId),
        );
    }

    return updatedData as User;
};
