import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { subscribeToUserCollection } from '@/shared/lib/firestore';
import { LiveCode } from '../../../model/types/liveCode';
import { ERROR_LIVE_CODE_MESSAGES } from '../../../model/consts/errorHRInterviewMessages';

export const subscribeToUserHRInterviews = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<LiveCode[]>) => void,
    ) => void,
    userId: string,
): (() => void) | undefined => {
    return subscribeToUserCollection<LiveCode>(
        'hrInterviewQA',
        userId,
        updateCachedData,
        ERROR_LIVE_CODE_MESSAGES.HR_INTERVIEWS_SNAPSHOT_FAIL,
    );
};
