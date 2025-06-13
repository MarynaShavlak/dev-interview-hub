import { getDoc, updateDoc } from 'firebase/firestore';
import { User } from '../../../model/types/user';
import { ERROR_USER_MESSAGES } from '../../../model/consts/errorUserMessages';
import { assertExists } from '@/shared/lib/checks/assertExists/assertExists';
import { getDocRefByField } from '@/shared/lib/firestore/getDocRefByField/getDocRefByField';

export const updateUserInFirestore = async (
    userId: string,
    updates: Partial<User>,
) => {
    const userDocRef = await getDocRefByField<User>('users', 'id', userId);
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
