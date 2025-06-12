import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';
import { handleRequestErrorMessage } from '../handleRequestErrorMessage/handleRequestErrorMessage';
import { createUserBasedQuery } from '../createUserBasedQuery/createUserBasedQuery';

type UpdateCacheFn<T> = (updater: (draft: MaybeDrafted<T[]>) => void) => void;

export const subscribeToUserCollection = <T extends object>(
    collectionName: string,
    userId: string,
    updateCachedData: UpdateCacheFn<T>,
    errorMessage: string,
): (() => void) | undefined => {
    if (!userId) return undefined;

    try {
        const query = createUserBasedQuery<T>(collectionName, userId);

        const unsubscribe = onSnapshot(query, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot.docs.map((doc) => doc.data()) as T[];
                return result;
            });
        });

        return unsubscribe;
    } catch (error) {
        handleRequestErrorMessage(errorMessage, error);
        return undefined;
    }
};
