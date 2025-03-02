import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';

import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';
import { User } from '../../../model/types/user';
import { ERROR_USER_MESSAGES } from '../../../model/consts/errorUserMessages';

import { createUserQuery } from '../createUserQuery/createUserQuery';

export const subscribeToUser = (
    updateCachedData: (updater: (draft: MaybeDrafted<User>) => void) => void,
    userId: string,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        if (!userId) return undefined;
        const userQuery = createUserQuery(userId);

        unsubscribe = onSnapshot(userQuery, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as User[];
                return result[0];
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_USER_MESSAGES.USER_SNAPSHOT_FAIL(userId),
            error,
        );
    }

    return unsubscribe;
};
