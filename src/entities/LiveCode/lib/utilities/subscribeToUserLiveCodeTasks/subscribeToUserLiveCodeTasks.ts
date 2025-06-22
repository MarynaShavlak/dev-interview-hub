import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { subscribeToUserCollection } from '@/shared/lib/firestore';
import { LiveCode } from '../../../model/types/liveCode';
import { ERROR_LIVE_CODE_MESSAGES } from '../../../model/consts/errorHRInterviewMessages';

export const subscribeToUserLiveCodeTasks = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<LiveCode[]>) => void,
    ) => void,
    userId: string,
): (() => void) | undefined => {
    return subscribeToUserCollection<LiveCode>(
        'liveCodeTasks',
        userId,
        updateCachedData,
        ERROR_LIVE_CODE_MESSAGES.LIVE_CODES_SNAPSHOT_FAIL,
    );
};
