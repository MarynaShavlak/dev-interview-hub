import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot, query } from 'firebase/firestore';
import { dataPoint } from '@/shared/lib/firestore/firestore';
import { User } from '../../../model/types/user';
import { ERROR_USER_MESSAGES } from '../../../model/consts/errorUserMessages';
import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';

export const subscribeToAllUsers = (
    updateCachedData: (updater: (draft: MaybeDrafted<User[]>) => void) => void,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        const collectionRef = dataPoint<User>('users');
        const queryRef = query(collectionRef);
        unsubscribe = onSnapshot(queryRef, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as User[];
                return result;
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_USER_MESSAGES.USERS_SNAPSHOT_FAIL,
            error,
        );
    }

    return unsubscribe;
};
