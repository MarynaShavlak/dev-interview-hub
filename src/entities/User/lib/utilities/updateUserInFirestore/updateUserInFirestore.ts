import { getDoc, updateDoc } from 'firebase/firestore';
import { User } from '../../../model/types/user';
import { getUserDocRefById } from '../getUserDocRefById/getUserDocRefById';
import { ERROR_USER_MESSAGES } from '../../../model/consts/errorUserMessages';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';

export const updateUserInFirestore = async (
    userId: string,
    updates: Partial<User>,
) => {
    const userDocRef = await getUserDocRefById(userId);
    assertExists(userDocRef, ERROR_USER_MESSAGES.USER_NOT_FOUND(userId));
    await updateDoc(userDocRef, updates);
    const updatedDoc = await getDoc(userDocRef);
    const updatedData = updatedDoc.data();
    assertExists(
        updatedData,
        ERROR_USER_MESSAGES.UPDATED_DATA_RETRIEVAL_ERROR(userId),
    );

    return updatedData as User;
};
