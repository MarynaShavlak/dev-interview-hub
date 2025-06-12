import { MaybeDrafted } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { subscribeToUserCollection } from '@/shared/lib/firestore';
import { HRInterviewQA } from '../../../model/types/hrInterviewQA';
import { ERROR_HR_INTERVIEW_MESSAGES } from '../../../model/consts/errorHRInterviewMessages';

export const subscribeToUserHRInterviews = (
    updateCachedData: (
        updater: (draft: MaybeDrafted<HRInterviewQA[]>) => void,
    ) => void,
    userId: string,
): (() => void) | undefined => {
    return subscribeToUserCollection<HRInterviewQA>(
        'hrInterviewQA',
        userId,
        updateCachedData,
        ERROR_HR_INTERVIEW_MESSAGES.HR_INTERVIEWS_SNAPSHOT_FAIL,
    );
};
