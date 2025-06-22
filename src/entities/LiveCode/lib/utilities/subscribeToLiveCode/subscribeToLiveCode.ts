import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { onSnapshot } from 'firebase/firestore';

import { handleRequestErrorMessage } from '@/shared/lib/firestore/handleRequestErrorMessage/handleRequestErrorMessage';

import { LiveCode } from '../../../model/types/liveCode';
import { ERROR_LIVE_CODE_MESSAGES } from '../../../model/consts/errorHRInterviewMessages';
import { createLiveCodeQuery } from '../createLiveCodeQuery/createLiveCodeQuery';

export const subscribeToLiveCode = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<LiveCode>) => void,
    ) => void,
    id: string,
) => {
    let unsubscribe: (() => void) | undefined;

    try {
        if (!id) return undefined;
        const query = createLiveCodeQuery(id);

        unsubscribe = onSnapshot(query, (snapshot) => {
            updateCachedData((draft) => {
                const result = snapshot?.docs?.map((doc) =>
                    doc.data(),
                ) as LiveCode[];
                return result[0];
            });
        });
    } catch (error) {
        handleRequestErrorMessage(
            ERROR_LIVE_CODE_MESSAGES.LIVE_CODE_SNAPSHOT_FAIL(id),
            error,
        );
    }

    return unsubscribe;
};
